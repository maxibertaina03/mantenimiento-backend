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
exports.AuditLogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const list_audit_logs_use_case_1 = require("../application/list-audit-logs.use-case");
const audit_logs_dto_1 = require("./audit-logs.dto");
let AuditLogsController = class AuditLogsController {
    listUC;
    constructor(listUC) {
        this.listUC = listUC;
    }
    async list(q, user) {
        const result = await this.listUC.execute({ ...q, tenantId: user.tenantId });
        return {
            items: result.items.map(audit_logs_dto_1.AuditLogResponseDto.from),
            total: result.total,
            page: result.page,
            pageSize: result.pageSize,
        };
    }
};
exports.AuditLogsController = AuditLogsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: audit_logs_dto_1.PaginatedAuditLogsResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audit_logs_dto_1.ListAuditLogsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], AuditLogsController.prototype, "list", null);
exports.AuditLogsController = AuditLogsController = __decorate([
    (0, swagger_1.ApiTags)('audit-logs'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'audit-logs', version: '1' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __metadata("design:paramtypes", [list_audit_logs_use_case_1.ListAuditLogsUseCase])
], AuditLogsController);
//# sourceMappingURL=audit-logs.controller.js.map