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
exports.ToolsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const register_tool_use_case_1 = require("../application/register-tool.use-case");
const update_tool_use_case_1 = require("../application/update-tool.use-case");
const change_tool_status_use_case_1 = require("../application/change-tool-status.use-case");
const loan_tool_use_case_1 = require("../application/loan-tool.use-case");
const return_tool_use_case_1 = require("../application/return-tool.use-case");
const list_tools_use_case_1 = require("../application/list-tools.use-case");
const get_tool_use_case_1 = require("../application/get-tool.use-case");
const list_loans_use_case_1 = require("../application/list-loans.use-case");
const delete_tool_use_case_1 = require("../application/delete-tool.use-case");
const tool_request_dto_1 = require("./tool-request.dto");
const tool_response_dto_1 = require("./tool-response.dto");
let ToolsController = class ToolsController {
    registerUC;
    updateUC;
    changeStatusUC;
    loanUC;
    returnUC;
    listUC;
    getUC;
    listLoansUC;
    deleteUC;
    constructor(registerUC, updateUC, changeStatusUC, loanUC, returnUC, listUC, getUC, listLoansUC, deleteUC) {
        this.registerUC = registerUC;
        this.updateUC = updateUC;
        this.changeStatusUC = changeStatusUC;
        this.loanUC = loanUC;
        this.returnUC = returnUC;
        this.listUC = listUC;
        this.getUC = getUC;
        this.listLoansUC = listLoansUC;
        this.deleteUC = deleteUC;
    }
    async list(q) {
        const r = await this.listUC.execute(q);
        return {
            items: r.items.map(tool_response_dto_1.ToolResponseDto.from),
            total: r.total,
            page: r.page,
            pageSize: r.pageSize,
        };
    }
    async get(id) {
        const { tool, activeLoan } = await this.getUC.execute(id);
        return {
            tool: tool_response_dto_1.ToolResponseDto.from(tool),
            activeLoan: activeLoan ? tool_response_dto_1.ToolLoanResponseDto.from(activeLoan) : null,
        };
    }
    async loans(id, page, pageSize) {
        const list = await this.listLoansUC.execute(id, page ? Number(page) : 1, pageSize ? Number(pageSize) : 20);
        return list.map(tool_response_dto_1.ToolLoanResponseDto.from);
    }
    async create(dto, user) {
        return tool_response_dto_1.ToolResponseDto.from(await this.registerUC.execute(dto, user.id, user.tenantId));
    }
    async update(id, dto, user) {
        return tool_response_dto_1.ToolResponseDto.from(await this.updateUC.execute(id, dto, user.id, user.tenantId));
    }
    async changeStatus(id, dto, user) {
        return tool_response_dto_1.ToolResponseDto.from(await this.changeStatusUC.execute(id, dto, user.id, user.tenantId));
    }
    async loan(id, dto, user) {
        const result = await this.loanUC.execute(id, dto, user.id, user.tenantId);
        return {
            tool: tool_response_dto_1.ToolResponseDto.from(result.tool),
            loan: tool_response_dto_1.ToolLoanResponseDto.from(result.loan),
        };
    }
    async return(id, user) {
        const result = await this.returnUC.execute(id, user.id, user.tenantId);
        return {
            tool: tool_response_dto_1.ToolResponseDto.from(result.tool),
            loan: tool_response_dto_1.ToolLoanResponseDto.from(result.loan),
        };
    }
    async remove(id, user) {
        await this.deleteUC.execute(id, user.id, user.tenantId);
    }
};
exports.ToolsController = ToolsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: tool_response_dto_1.PaginatedToolResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tool_request_dto_1.ListToolsQueryDto]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: tool_response_dto_1.ToolDetailResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':id/loans'),
    (0, swagger_1.ApiOkResponse)({ type: [tool_response_dto_1.ToolLoanResponseDto] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "loans", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tool_request_dto_1.CreateToolDto, Object]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tool_request_dto_1.UpdateToolDto, Object]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tool_request_dto_1.ChangeToolStatusDto, Object]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Post)(':id/loans'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tool_request_dto_1.LoanToolDto, Object]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "loan", null);
__decorate([
    (0, common_1.Post)(':id/return'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "return", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "remove", null);
exports.ToolsController = ToolsController = __decorate([
    (0, swagger_1.ApiTags)('tools'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'tools', version: '1' }),
    __metadata("design:paramtypes", [register_tool_use_case_1.RegisterToolUseCase,
        update_tool_use_case_1.UpdateToolUseCase,
        change_tool_status_use_case_1.ChangeToolStatusUseCase,
        loan_tool_use_case_1.LoanToolUseCase,
        return_tool_use_case_1.ReturnToolUseCase,
        list_tools_use_case_1.ListToolsUseCase,
        get_tool_use_case_1.GetToolUseCase,
        list_loans_use_case_1.ListLoansUseCase,
        delete_tool_use_case_1.DeleteToolUseCase])
], ToolsController);
//# sourceMappingURL=tools.controller.js.map