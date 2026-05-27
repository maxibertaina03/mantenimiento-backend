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
exports.ProvidersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const register_provider_use_case_1 = require("../application/register-provider.use-case");
const update_provider_use_case_1 = require("../application/update-provider.use-case");
const toggle_active_provider_use_case_1 = require("../application/toggle-active-provider.use-case");
const list_providers_use_case_1 = require("../application/list-providers.use-case");
const get_provider_use_case_1 = require("../application/get-provider.use-case");
const provider_request_dto_1 = require("./provider-request.dto");
const provider_response_dto_1 = require("./provider-response.dto");
const maintenance_response_dto_1 = require("../../maintenance/presentation/maintenance-response.dto");
const maintenance_order_entity_1 = require("../../maintenance/domain/maintenance-order.entity");
let ProvidersController = class ProvidersController {
    registerUC;
    updateUC;
    toggleUC;
    listUC;
    getUC;
    prisma;
    audit;
    constructor(registerUC, updateUC, toggleUC, listUC, getUC, prisma, audit) {
        this.registerUC = registerUC;
        this.updateUC = updateUC;
        this.toggleUC = toggleUC;
        this.listUC = listUC;
        this.getUC = getUC;
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(q) {
        const r = await this.listUC.execute(q);
        return {
            items: r.items.map(provider_response_dto_1.ProviderResponseDto.from),
            total: r.total,
            page: r.page,
            pageSize: r.pageSize,
        };
    }
    async get(id) {
        return provider_response_dto_1.ProviderResponseDto.from(await this.getUC.execute(id));
    }
    async history(id, page = 1, pageSize = 50) {
        const provider = await this.getUC.execute(id).catch(() => null);
        if (!provider)
            throw new domain_exception_1.NotFoundError('Provider', id);
        const take = Math.min(100, Number(pageSize));
        const skip = (Math.max(1, Number(page)) - 1) * take;
        const rows = await this.prisma.maintenanceOrder.findMany({
            where: { providerId: id, deletedAt: null },
            orderBy: [{ scheduledFor: 'desc' }, { createdAt: 'desc' }],
            skip,
            take,
        });
        return rows.map((row) => maintenance_response_dto_1.MaintenanceResponseDto.from(maintenance_order_entity_1.MaintenanceOrder.rehydrate({
            id: row.id,
            machineId: row.machineId,
            type: row.type,
            status: row.status,
            location: row.location,
            externalLocation: row.externalLocation,
            scheduledFor: row.scheduledFor,
            startedAt: row.startedAt,
            completedAt: row.completedAt,
            machineHoursSnapshot: row.machineHoursSnapshot,
            technicianId: row.technicianId,
            providerId: row.providerId,
            cost: row.cost,
            currency: row.currency,
            description: row.description,
            observations: row.observations,
            tenantId: row.tenantId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        })));
    }
    async create(dto, user) {
        return provider_response_dto_1.ProviderResponseDto.from(await this.registerUC.execute(dto, user.id, user.tenantId));
    }
    async update(id, dto, user) {
        return provider_response_dto_1.ProviderResponseDto.from(await this.updateUC.execute(id, dto, user.id, user.tenantId));
    }
    async toggle(id, dto, user) {
        return provider_response_dto_1.ProviderResponseDto.from(await this.toggleUC.execute(id, dto.active, user.id, user.tenantId));
    }
    async remove(id, user) {
        const provider = await this.getUC.execute(id);
        await this.prisma.provider.update({ where: { id }, data: { deletedAt: new Date() } });
        await this.audit.write({
            actorId: user.id,
            action: 'DELETE',
            entityType: 'Provider',
            entityId: id,
            payload: { name: provider.name },
            tenantId: user.tenantId,
        });
    }
};
exports.ProvidersController = ProvidersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: provider_response_dto_1.PaginatedProviderResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_request_dto_1.ListProvidersQueryDto]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: provider_response_dto_1.ProviderResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, swagger_1.ApiOkResponse)({ type: [maintenance_response_dto_1.MaintenanceResponseDto] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "history", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_request_dto_1.CreateProviderDto, Object]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provider_request_dto_1.UpdateProviderDto, Object]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/active'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provider_request_dto_1.ToggleActiveProviderDto, Object]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "toggle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "remove", null);
exports.ProvidersController = ProvidersController = __decorate([
    (0, swagger_1.ApiTags)('providers'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'providers', version: '1' }),
    __metadata("design:paramtypes", [register_provider_use_case_1.RegisterProviderUseCase,
        update_provider_use_case_1.UpdateProviderUseCase,
        toggle_active_provider_use_case_1.ToggleActiveProviderUseCase,
        list_providers_use_case_1.ListProvidersUseCase,
        get_provider_use_case_1.GetProviderUseCase,
        prisma_service_1.PrismaService,
        audit_writer_1.AuditWriter])
], ProvidersController);
//# sourceMappingURL=providers.controller.js.map