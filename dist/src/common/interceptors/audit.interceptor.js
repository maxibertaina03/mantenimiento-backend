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
exports.AuditInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const audited_decorator_1 = require("../decorators/audited.decorator");
const audit_writer_1 = require("../../infrastructure/audit/audit.writer");
let AuditInterceptor = class AuditInterceptor {
    reflector;
    auditWriter;
    constructor(reflector, auditWriter) {
        this.reflector = reflector;
        this.auditWriter = auditWriter;
    }
    intercept(context, next) {
        const meta = this.reflector.get(audited_decorator_1.AUDITED_KEY, context.getHandler());
        if (!meta)
            return next.handle();
        const req = context.switchToHttp().getRequest();
        const args = context.getArgs();
        return next.handle().pipe((0, rxjs_1.tap)((result) => {
            const entityId = meta.resolveEntityId
                ? meta.resolveEntityId({ args, result })
                : this.guessEntityIdFromResult(result);
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
        }));
    }
    guessEntityIdFromResult(result) {
        if (result && typeof result === 'object' && 'id' in result) {
            const id = result.id;
            return typeof id === 'string' ? id : undefined;
        }
        return undefined;
    }
    safeSnapshot(value) {
        try {
            return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
        }
        catch {
            return undefined;
        }
    }
};
exports.AuditInterceptor = AuditInterceptor;
exports.AuditInterceptor = AuditInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        audit_writer_1.AuditWriter])
], AuditInterceptor);
//# sourceMappingURL=audit.interceptor.js.map