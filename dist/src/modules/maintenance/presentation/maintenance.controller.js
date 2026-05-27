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
exports.MaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const schedule_maintenance_use_case_1 = require("../application/schedule-maintenance.use-case");
const start_maintenance_use_case_1 = require("../application/start-maintenance.use-case");
const complete_maintenance_use_case_1 = require("../application/complete-maintenance.use-case");
const cancel_maintenance_use_case_1 = require("../application/cancel-maintenance.use-case");
const update_maintenance_use_case_1 = require("../application/update-maintenance.use-case");
const list_maintenance_use_case_1 = require("../application/list-maintenance.use-case");
const get_maintenance_use_case_1 = require("../application/get-maintenance.use-case");
const maintenance_request_dto_1 = require("./maintenance-request.dto");
const maintenance_response_dto_1 = require("./maintenance-response.dto");
let MaintenanceController = class MaintenanceController {
    scheduleUC;
    startUC;
    completeUC;
    cancelUC;
    updateUC;
    listUC;
    getUC;
    constructor(scheduleUC, startUC, completeUC, cancelUC, updateUC, listUC, getUC) {
        this.scheduleUC = scheduleUC;
        this.startUC = startUC;
        this.completeUC = completeUC;
        this.cancelUC = cancelUC;
        this.updateUC = updateUC;
        this.listUC = listUC;
        this.getUC = getUC;
    }
    async list(query) {
        const result = await this.listUC.execute(query);
        return {
            items: result.items.map(maintenance_response_dto_1.MaintenanceResponseDto.from),
            total: result.total,
            page: result.page,
            pageSize: result.pageSize,
        };
    }
    async get(id) {
        return maintenance_response_dto_1.MaintenanceResponseDto.from(await this.getUC.execute(id));
    }
    async schedule(dto, user) {
        const order = await this.scheduleUC.execute(dto, user.id, user.tenantId);
        return maintenance_response_dto_1.MaintenanceResponseDto.from(order);
    }
    async update(id, dto, user) {
        const order = await this.updateUC.execute(id, dto, user.id, user.tenantId);
        return maintenance_response_dto_1.MaintenanceResponseDto.from(order);
    }
    async start(id, user) {
        const order = await this.startUC.execute(id, user.id, user.tenantId);
        return maintenance_response_dto_1.MaintenanceResponseDto.from(order);
    }
    async complete(id, dto, user) {
        const order = await this.completeUC.execute(id, dto, user.id, user.tenantId);
        return maintenance_response_dto_1.MaintenanceResponseDto.from(order);
    }
    async cancel(id, dto, user) {
        const order = await this.cancelUC.execute(id, dto, user.id, user.tenantId);
        return maintenance_response_dto_1.MaintenanceResponseDto.from(order);
    }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: maintenance_response_dto_1.PaginatedMaintenanceResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [maintenance_request_dto_1.ListMaintenanceQueryDto]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: maintenance_response_dto_1.MaintenanceResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [maintenance_request_dto_1.ScheduleMaintenanceDto, Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "schedule", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, maintenance_request_dto_1.UpdateMaintenanceDto, Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "start", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, maintenance_request_dto_1.CompleteMaintenanceDto, Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "complete", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, maintenance_request_dto_1.CancelMaintenanceDto, Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "cancel", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('maintenance'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'maintenance', version: '1' }),
    __metadata("design:paramtypes", [schedule_maintenance_use_case_1.ScheduleMaintenanceUseCase,
        start_maintenance_use_case_1.StartMaintenanceUseCase,
        complete_maintenance_use_case_1.CompleteMaintenanceUseCase,
        cancel_maintenance_use_case_1.CancelMaintenanceUseCase,
        update_maintenance_use_case_1.UpdateMaintenanceUseCase,
        list_maintenance_use_case_1.ListMaintenanceUseCase,
        get_maintenance_use_case_1.GetMaintenanceUseCase])
], MaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map