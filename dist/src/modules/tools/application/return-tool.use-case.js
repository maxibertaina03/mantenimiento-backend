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
exports.ReturnToolUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const tool_repository_1 = require("../domain/tool.repository");
let ReturnToolUseCase = class ReturnToolUseCase {
    tools;
    audit;
    constructor(tools, audit) {
        this.tools = tools;
        this.audit = audit;
    }
    async execute(toolId, actorId, tenantId) {
        const tool = await this.tools.findById(toolId);
        if (!tool)
            throw new domain_exception_1.NotFoundError('Tool', toolId);
        const { from, to } = tool.returnFromLoan();
        const loan = await this.tools.closeActiveLoan(tool, new Date());
        await this.audit.write({
            actorId,
            action: 'STATE_CHANGE',
            entityType: 'Tool',
            entityId: tool.id,
            payload: {
                kind: 'RETURN',
                from,
                to,
                loanId: loan.id,
            },
            tenantId,
        });
        return { tool, loan };
    }
};
exports.ReturnToolUseCase = ReturnToolUseCase;
exports.ReturnToolUseCase = ReturnToolUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tool_repository_1.TOOL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], ReturnToolUseCase);
//# sourceMappingURL=return-tool.use-case.js.map