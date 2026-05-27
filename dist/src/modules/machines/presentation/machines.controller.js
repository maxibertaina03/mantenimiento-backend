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
exports.MachinesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const audited_decorator_1 = require("../../../common/decorators/audited.decorator");
const register_machine_use_case_1 = require("../application/register-machine.use-case");
const update_machine_use_case_1 = require("../application/update-machine.use-case");
const change_machine_status_use_case_1 = require("../application/change-machine-status.use-case");
const log_machine_hours_use_case_1 = require("../application/log-machine-hours.use-case");
const list_machines_use_case_1 = require("../application/list-machines.use-case");
const get_machine_use_case_1 = require("../application/get-machine.use-case");
const delete_machine_use_case_1 = require("../application/delete-machine.use-case");
const get_preventive_alerts_use_case_1 = require("../application/get-preventive-alerts.use-case");
const list_usage_logs_use_case_1 = require("../application/list-usage-logs.use-case");
const machine_request_dto_1 = require("./machine-request.dto");
const machine_response_dto_1 = require("./machine-response.dto");
const usage_log_response_dto_1 = require("./usage-log-response.dto");
let MachinesController = class MachinesController {
    registerUC;
    updateUC;
    changeStatusUC;
    logHoursUC;
    listUC;
    getUC;
    deleteUC;
    preventiveUC;
    listUsageUC;
    constructor(registerUC, updateUC, changeStatusUC, logHoursUC, listUC, getUC, deleteUC, preventiveUC, listUsageUC) {
        this.registerUC = registerUC;
        this.updateUC = updateUC;
        this.changeStatusUC = changeStatusUC;
        this.logHoursUC = logHoursUC;
        this.listUC = listUC;
        this.getUC = getUC;
        this.deleteUC = deleteUC;
        this.preventiveUC = preventiveUC;
        this.listUsageUC = listUsageUC;
    }
    async list(query) {
        const result = await this.listUC.execute(query);
        return {
            items: result.items.map(machine_response_dto_1.MachineResponseDto.from),
            total: result.total,
            page: result.page,
            pageSize: result.pageSize,
        };
    }
    async preventiveAlerts(user) {
        const alerts = await this.preventiveUC.execute(user.tenantId);
        return alerts.map((a) => ({
            machine: machine_response_dto_1.MachineResponseDto.from(a.machine),
            overdueByHours: a.overdueByHours,
        }));
    }
    async get(id) {
        return machine_response_dto_1.MachineResponseDto.from(await this.getUC.execute(id));
    }
    async usageLogs(id, page, pageSize) {
        const logs = await this.listUsageUC.execute(id, page ? Number(page) : 1, pageSize ? Number(pageSize) : 20);
        return logs.map(usage_log_response_dto_1.UsageLogResponseDto.from);
    }
    async create(dto, user) {
        const machine = await this.registerUC.execute(dto, user.id, user.tenantId);
        return machine_response_dto_1.MachineResponseDto.from(machine);
    }
    async update(id, dto, user) {
        const machine = await this.updateUC.execute(id, dto, user.id, user.tenantId);
        return machine_response_dto_1.MachineResponseDto.from(machine);
    }
    async changeStatus(id, dto, user) {
        const machine = await this.changeStatusUC.execute(id, dto, user.id, user.tenantId);
        return machine_response_dto_1.MachineResponseDto.from(machine);
    }
    async logHours(id, dto, user) {
        const result = await this.logHoursUC.execute(id, dto, user.id, user.tenantId);
        return {
            machine: machine_response_dto_1.MachineResponseDto.from(result.machine),
            log: usage_log_response_dto_1.UsageLogResponseDto.from(result.log),
        };
    }
    async remove(id, user) {
        await this.deleteUC.execute(id, user.id, user.tenantId);
    }
};
exports.MachinesController = MachinesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: machine_response_dto_1.PaginatedMachineResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [machine_request_dto_1.ListMachinesQueryDto]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('preventive-alerts'),
    (0, swagger_1.ApiOkResponse)({ type: [machine_response_dto_1.PreventiveAlertDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "preventiveAlerts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: machine_response_dto_1.MachineResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':id/usage-logs'),
    (0, swagger_1.ApiOkResponse)({ type: [usage_log_response_dto_1.UsageLogResponseDto] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "usageLogs", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    (0, audited_decorator_1.Audited)({
        action: 'CREATE',
        entity: 'Machine',
        resolveEntityId: ({ result }) => result?.id,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [machine_request_dto_1.CreateMachineDto, Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, machine_request_dto_1.UpdateMachineDto, Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, machine_request_dto_1.ChangeMachineStatusDto, Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Post)(':id/usage-logs'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, machine_request_dto_1.LogMachineHoursDto, Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "logHours", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "remove", null);
exports.MachinesController = MachinesController = __decorate([
    (0, swagger_1.ApiTags)('machines'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'machines', version: '1' }),
    __metadata("design:paramtypes", [register_machine_use_case_1.RegisterMachineUseCase,
        update_machine_use_case_1.UpdateMachineUseCase,
        change_machine_status_use_case_1.ChangeMachineStatusUseCase,
        log_machine_hours_use_case_1.LogMachineHoursUseCase,
        list_machines_use_case_1.ListMachinesUseCase,
        get_machine_use_case_1.GetMachineUseCase,
        delete_machine_use_case_1.DeleteMachineUseCase,
        get_preventive_alerts_use_case_1.GetPreventiveAlertsUseCase,
        list_usage_logs_use_case_1.ListUsageLogsUseCase])
], MachinesController);
//# sourceMappingURL=machines.controller.js.map