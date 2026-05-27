"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("@prisma/client");
const domain_exception_1 = require("../exceptions/domain.exception");
const KIND_TO_STATUS = {
    VALIDATION: common_1.HttpStatus.BAD_REQUEST,
    NOT_FOUND: common_1.HttpStatus.NOT_FOUND,
    CONFLICT: common_1.HttpStatus.CONFLICT,
    FORBIDDEN: common_1.HttpStatus.FORBIDDEN,
    UNAUTHORIZED: common_1.HttpStatus.UNAUTHORIZED,
    INVARIANT: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    UNAVAILABLE: common_1.HttpStatus.SERVICE_UNAVAILABLE,
    UNEXPECTED: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
};
let HttpExceptionFilter = class HttpExceptionFilter {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        const payload = this.toPayload(exception, req);
        if (payload.statusCode >= 500) {
            this.logger.error({ err: exception, payload }, payload.message);
        }
        else if (payload.statusCode >= 400) {
            this.logger.warn({ payload }, payload.message);
        }
        res.status(payload.statusCode).json({ error: payload });
    }
    toPayload(exception, req) {
        const base = {
            path: req.url,
            timestamp: new Date().toISOString(),
            requestId: req.id,
        };
        if (exception instanceof domain_exception_1.DomainException) {
            return {
                ...base,
                statusCode: KIND_TO_STATUS[exception.kind],
                code: exception.code,
                message: exception.message,
                details: exception.details,
            };
        }
        if (exception instanceof common_1.HttpException) {
            const response = exception.getResponse();
            const isObj = typeof response === 'object' && response !== null;
            const message = isObj && 'message' in response
                ? String(response.message)
                : exception.message;
            return {
                ...base,
                statusCode: exception.getStatus(),
                code: exception.name.replace(/Exception$/, '').toUpperCase() || 'HTTP_ERROR',
                message,
                details: isObj ? response : undefined,
            };
        }
        if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return this.fromPrismaKnown(exception, base);
        }
        if (exception instanceof client_1.Prisma.PrismaClientValidationError) {
            return {
                ...base,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                code: 'PRISMA_VALIDATION',
                message: 'Datos inválidos para la operación de base de datos',
            };
        }
        return {
            ...base,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            code: 'INTERNAL_ERROR',
            message: 'Error interno del servidor',
        };
    }
    fromPrismaKnown(e, base) {
        switch (e.code) {
            case 'P2002':
                return {
                    ...base,
                    statusCode: common_1.HttpStatus.CONFLICT,
                    code: 'UNIQUE_CONSTRAINT',
                    message: 'Ya existe un registro con esos valores únicos',
                    details: { target: e.meta?.target },
                };
            case 'P2025':
                return {
                    ...base,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    code: 'NOT_FOUND',
                    message: 'Registro no encontrado',
                };
            case 'P2003':
                return {
                    ...base,
                    statusCode: common_1.HttpStatus.CONFLICT,
                    code: 'FOREIGN_KEY',
                    message: 'Violación de clave foránea',
                    details: { field: e.meta?.field_name },
                };
            default:
                return {
                    ...base,
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    code: `PRISMA_${e.code}`,
                    message: 'Error de base de datos',
                };
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [nestjs_pino_1.Logger])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map