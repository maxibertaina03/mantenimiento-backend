import {
  CallHandler,
  ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import type { Request } from 'express';

import { AUDITED_KEY, type AuditedMetadata } from '../decorators/audited.decorator';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

/**
 * Si el handler está marcado con `@Audited(...)`, escribe una entrada en
 * `audit_logs` cuando la operación se completa exitosamente.
 *
 * Para casos donde el `entityId` se conoce sólo tras ejecutar (ej. CREATE),
 * `resolveEntityId({ args, result })` permite extraerlo del retorno.
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly auditWriter: AuditWriter,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const meta = this.reflector.get<AuditedMetadata | undefined>(AUDITED_KEY, context.getHandler());
    if (!meta) return next.handle();

    const req = context.switchToHttp().getRequest<Request & { user?: AuthenticatedUser; id?: string }>();
    const args = context.getArgs<unknown[]>();

    return next.handle().pipe(
      tap((result) => {
        const entityId = meta.resolveEntityId
          ? meta.resolveEntityId({ args, result })
          : this.guessEntityIdFromResult(result);

        // Fire-and-forget para no bloquear la respuesta.
        void this.auditWriter.write({
          actorId: req.user?.id,
          action: meta.action,
          entityType: meta.entity,
          entityId,
          payload: {
            method: req.method,
            route: req.route?.path ?? req.url,
            body: this.safeSnapshot(req.body),
          },
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
          requestId: req.id,
          tenantId: req.user?.tenantId ?? null,
        });
      }),
    );
  }

  private guessEntityIdFromResult(result: unknown): string | undefined {
    if (result && typeof result === 'object' && 'id' in result) {
      const id = (result as { id: unknown }).id;
      return typeof id === 'string' ? id : undefined;
    }
    return undefined;
  }

  private safeSnapshot(value: unknown): unknown {
    try {
      return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
    } catch {
      return undefined;
    }
  }
}
