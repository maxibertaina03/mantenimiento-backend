"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ForbiddenError = exports.InvariantError = exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.DomainException = void 0;
class DomainException extends Error {
    kind;
    code;
    details;
    constructor(params) {
        super(params.message);
        this.name = 'DomainException';
        this.kind = params.kind;
        this.code = params.code;
        this.details = params.details;
    }
}
exports.DomainException = DomainException;
class NotFoundError extends DomainException {
    constructor(entity, id) {
        super({
            kind: 'NOT_FOUND',
            code: `${entity.toUpperCase()}_NOT_FOUND`,
            message: id ? `${entity} ${id} no encontrado` : `${entity} no encontrado`,
            details: { entity, id },
        });
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends DomainException {
    constructor(code, message, details) {
        super({ kind: 'CONFLICT', code, message, details });
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends DomainException {
    constructor(code, message, details) {
        super({ kind: 'VALIDATION', code, message, details });
    }
}
exports.ValidationError = ValidationError;
class InvariantError extends DomainException {
    constructor(code, message, details) {
        super({ kind: 'INVARIANT', code, message, details });
    }
}
exports.InvariantError = InvariantError;
class ForbiddenError extends DomainException {
    constructor(code = 'FORBIDDEN', message = 'No tiene permisos para esta acción') {
        super({ kind: 'FORBIDDEN', code, message });
    }
}
exports.ForbiddenError = ForbiddenError;
class UnauthorizedError extends DomainException {
    constructor(code = 'UNAUTHORIZED', message = 'No autenticado') {
        super({ kind: 'UNAUTHORIZED', code, message });
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=domain.exception.js.map