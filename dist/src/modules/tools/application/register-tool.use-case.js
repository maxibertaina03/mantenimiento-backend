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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterToolUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const tool_repository_1 = require("../domain/tool.repository");
let RegisterToolUseCase = class RegisterToolUseCase {
    tools;
    audit;
    constructor(tools, audit) {
        this.tools = tools;
        this.audit = audit;
    }
    async execute(input, actorId, tenantId) {
        const existing = await this.tools.findByCode(input.code);
        if (existing) {
            throw new domain_exception_1.ConflictError('TOOL_CODE_TAKEN', `El código ${input.code} ya está en uso`);
        }
        const tool = await this.tools.create({
            code: input.code,
            name: input.name,
            description: input.description ?? null,
            brand: input.brand ?? null,
            model: input.model ?? null,
            serialNumber: input.serialNumber ?? null,
            location: input.location ?? null,
            observations: input.observations ?? null,
            acquiredAt: input.acquiredAt ? new Date(input.acquiredAt) : null,
            tenantId,
        });
        await this.audit.write({
            actorId,
            action: 'CREATE',
            entityType: 'Tool',
            entityId: tool.id,
            payload: { code: tool.code, name: tool.name },
            tenantId,
        });
        return tool;
    }
};
exports.RegisterToolUseCase = RegisterToolUseCase;
exports.RegisterToolUseCase = RegisterToolUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tool_repository_1.TOOL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], RegisterToolUseCase);
//# sourceMappingURL=register-tool.use-case.js.map