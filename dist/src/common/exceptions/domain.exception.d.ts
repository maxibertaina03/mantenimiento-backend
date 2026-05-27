export type DomainErrorKind = 'VALIDATION' | 'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN' | 'UNAUTHORIZED' | 'INVARIANT' | 'UNAVAILABLE' | 'UNEXPECTED';
export declare class DomainException extends Error {
    readonly kind: DomainErrorKind;
    readonly code: string;
    readonly details?: Record<string, unknown>;
    constructor(params: {
        kind: DomainErrorKind;
        code: string;
        message: string;
        details?: Record<string, unknown>;
    });
}
export declare class NotFoundError extends DomainException {
    constructor(entity: string, id?: string);
}
export declare class ConflictError extends DomainException {
    constructor(code: string, message: string, details?: Record<string, unknown>);
}
export declare class ValidationError extends DomainException {
    constructor(code: string, message: string, details?: Record<string, unknown>);
}
export declare class InvariantError extends DomainException {
    constructor(code: string, message: string, details?: Record<string, unknown>);
}
export declare class ForbiddenError extends DomainException {
    constructor(code?: string, message?: string);
}
export declare class UnauthorizedError extends DomainException {
    constructor(code?: string, message?: string);
}
