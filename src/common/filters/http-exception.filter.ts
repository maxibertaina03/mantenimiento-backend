import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';
import { Prisma } from '@prisma/client';
import { DomainException, type DomainErrorKind } from '../exceptions/domain.exception';

interface ErrorPayload {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
  path: string;
  timestamp: string;
  requestId?: string;
}

const KIND_TO_STATUS: Record<DomainErrorKind, number> = {
  VALIDATION: HttpStatus.BAD_REQUEST,
  NOT_FOUND: HttpStatus.NOT_FOUND,
  CONFLICT: HttpStatus.CONFLICT,
  FORBIDDEN: HttpStatus.FORBIDDEN,
  UNAUTHORIZED: HttpStatus.UNAUTHORIZED,
  INVARIANT: HttpStatus.UNPROCESSABLE_ENTITY,
  UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE,
  UNEXPECTED: HttpStatus.INTERNAL_SERVER_ERROR,
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request & { id?: string }>();
    const res = ctx.getResponse<Response>();

    const payload = this.toPayload(exception, req);

    // Log con nivel según severidad
    if (payload.statusCode >= 500) {
      this.logger.error({ err: exception, payload }, payload.message);
    } else if (payload.statusCode >= 400) {
      this.logger.warn({ payload }, payload.message);
    }

    res.status(payload.statusCode).json({ error: payload });
  }

  private toPayload(exception: unknown, req: Request & { id?: string }): ErrorPayload {
    const base = {
      path: req.url,
      timestamp: new Date().toISOString(),
      requestId: req.id,
    };

    if (exception instanceof DomainException) {
      return {
        ...base,
        statusCode: KIND_TO_STATUS[exception.kind],
        code: exception.code,
        message: exception.message,
        details: exception.details,
      };
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const isObj = typeof response === 'object' && response !== null;
      const message =
        isObj && 'message' in response
          ? String((response as { message: unknown }).message)
          : exception.message;
      return {
        ...base,
        statusCode: exception.getStatus(),
        code: exception.name.replace(/Exception$/, '').toUpperCase() || 'HTTP_ERROR',
        message,
        details: isObj ? response : undefined,
      };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.fromPrismaKnown(exception, base);
    }
    if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        ...base,
        statusCode: HttpStatus.BAD_REQUEST,
        code: 'PRISMA_VALIDATION',
        message: 'Datos inválidos para la operación de base de datos',
      };
    }

    return {
      ...base,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
    };
  }

  private fromPrismaKnown(
    e: Prisma.PrismaClientKnownRequestError,
    base: Pick<ErrorPayload, 'path' | 'timestamp' | 'requestId'>,
  ): ErrorPayload {
    switch (e.code) {
      case 'P2002':
        return {
          ...base,
          statusCode: HttpStatus.CONFLICT,
          code: 'UNIQUE_CONSTRAINT',
          message: 'Ya existe un registro con esos valores únicos',
          details: { target: e.meta?.target },
        };
      case 'P2025':
        return {
          ...base,
          statusCode: HttpStatus.NOT_FOUND,
          code: 'NOT_FOUND',
          message: 'Registro no encontrado',
        };
      case 'P2003':
        return {
          ...base,
          statusCode: HttpStatus.CONFLICT,
          code: 'FOREIGN_KEY',
          message: 'Violación de clave foránea',
          details: { field: e.meta?.field_name },
        };
      default:
        return {
          ...base,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          code: `PRISMA_${e.code}`,
          message: 'Error de base de datos',
        };
    }
  }
}
