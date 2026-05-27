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
exports.DeleteToolUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const tool_repository_1 = require("../domain/tool.repository");
let DeleteToolUseCase = class DeleteToolUseCase {
    tools;
    audit;
    constructor(tools, audit) {
        this.tools = tools;
        this.audit = audit;
    }
    async execute(id, actorId, tenantId) {
        const tool = await this.tools.findById(id);
        if (!tool)
            throw new domain_exception_1.NotFoundError('Tool', id);
        if (tool.status === 'ON_LOAN') {
            throw new domain_exception_1.InvariantError('TOOL_ON_LOAN', 'No se puede eliminar una herramienta prestada. Cerrar el préstamo primero.');
        }
        await this.tools.softDelete(id);
        await this.audit.write({
            actorId,
            action: 'DELETE',
            entityType: 'Tool',
            entityId: id,
            payload: { code: tool.code, name: tool.name },
            tenantId,
        });
    }
};
exports.DeleteToolUseCase = DeleteToolUseCase;
exports.DeleteToolUseCase = DeleteToolUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tool_repository_1.TOOL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], DeleteToolUseCase);
//# sourceMappingURL=delete-tool.use-case.js.map