/**
 * Excepción de dominio agnóstica al transporte (HTTP/gRPC/etc).
 * Las capas `application`/`domain` deben lanzar estas (no HttpException de Nest)
 * y el `HttpExceptionFilter` se encarga del mapeo HTTP.
 */
export type DomainErrorKind =
  | 'VALIDATION'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'FORBIDDEN'
  | 'UNAUTHORIZED'
  | 'INVARIANT'
  | 'UNAVAILABLE'
  | 'UNEXPECTED';

export class DomainException extends Error {
  public readonly kind: DomainErrorKind;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(params: {
    kind: DomainErrorKind;
    code: string;
    message: string;
    details?: Record<string, unknown>;
  }) {
    super(params.message);
    this.name = 'DomainException';
    this.kind = params.kind;
    this.code = params.code;
    this.details = params.details;
  }
}

export class NotFoundError extends DomainException {
  constructor(entity: string, id?: string) {
    super({
      kind: 'NOT_FOUND',
      code: `${entity.toUpperCase()}_NOT_FOUND`,
      message: id ? `${entity} ${id} no encontrado` : `${entity} no encontrado`,
      details: { entity, id },
    });
  }
}

export class ConflictError extends DomainException {
  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super({ kind: 'CONFLICT', code, message, details });
  }
}

export class ValidationError extends DomainException {
  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super({ kind: 'VALIDATION', code, message, details });
  }
}

export class InvariantError extends DomainException {
  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super({ kind: 'INVARIANT', code, message, details });
  }
}

export class ForbiddenError extends DomainException {
  constructor(code = 'FORBIDDEN', message = 'No tiene permisos para esta acción') {
    super({ kind: 'FORBIDDEN', code, message });
  }
}

export class UnauthorizedError extends DomainException {
  constructor(code = 'UNAUTHORIZED', message = 'No autenticado') {
    super({ kind: 'UNAUTHORIZED', code, message });
  }
}
