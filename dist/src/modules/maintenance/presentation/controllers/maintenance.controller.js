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
const library_1 = require("@prisma/client/runtime/library");
const create_maintenance_order_use_case_1 = require("../../application/use-cases/create-maintenance-order/create-maintenance-order.use-case");
const list_maintenance_orders_use_case_1 = require("../../application/use-cases/list-maintenance-orders/list-maintenance-orders.use-case");
const get_maintenance_order_use_case_1 = require("../../application/use-cases/get-maintenance-order/get-maintenance-order.use-case");
const start_maintenance_order_use_case_1 = require("../../application/use-cases/start-maintenance-order/start-maintenance-order.use-case");
const complete_maintenance_order_use_case_1 = require("../../application/use-cases/complete-maintenance-order/complete-maintenance-order.use-case");
const delete_maintenance_order_use_case_1 = require("../../application/use-cases/delete-maintenance-order/delete-maintenance-order.use-case");
const create_maintenance_order_request_dto_1 = require("../dtos/create-maintenance-order.request.dto");
const maintenance_order_response_dto_1 = require("../dtos/maintenance-order.response.dto");
const clerk_auth_guard_1 = require("../../../../common/guards/clerk-auth.guard");
const get_tenant_id_decorator_1 = require("../../../../common/decorators/get-tenant-id.decorator");
let MaintenanceController = class MaintenanceController {
    createOrder;
    listOrders;
    getOrder;
    startOrder;
    completeOrder;
    deleteOrder;
    constructor(createOrder, listOrders, getOrder, startOrder, completeOrder, deleteOrder) {
        this.createOrder = createOrder;
        this.listOrders = listOrders;
        this.getOrder = getOrder;
        this.startOrder = startOrder;
        this.completeOrder = completeOrder;
        this.deleteOrder = deleteOrder;
    }
    async create(dto) {
        const output = await this.createOrder.execute({
            machineId: dto.machineId,
            type: dto.type,
            location: dto.location,
            externalLocation: dto.externalLocation ?? null,
            scheduledFor: dto.scheduledFor ? new Date(dto.scheduledFor) : null,
            technicianId: dto.technicianId ?? null,
            providerId: dto.providerId ?? null,
            cost: dto.cost ? new library_1.Decimal(dto.cost) : null,
            currency: dto.currency,
            description: dto.description ?? null,
            observations: dto.observations ?? null,
        });
        return {
            id: output.id,
            machineId: output.machineId,
            type: output.type,
            status: output.status,
            location: output.location,
            cost: output.cost,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
    async list(tenantId, page, pageSize, _machineId, _status, _type, _technicianId, _providerId, _scheduledFrom, _scheduledTo) {
        const output = await this.listOrders.execute({
            tenantId,
            page: page ? Number(page) : undefined,
            pageSize: pageSize ? Number(pageSize) : undefined,
        });
        return {
            items: output.items.map((item) => ({
                id: item.id,
                machineId: item.machineId,
                type: item.type,
                status: item.status,
                location: item.location,
                externalLocation: item.externalLocation,
                scheduledFor: item.scheduledFor,
                startedAt: item.startedAt,
                completedAt: item.completedAt,
                technicianId: item.technicianId,
                providerId: item.providerId,
                cost: item.cost,
                currency: item.currency,
                description: item.description,
                observations: item.observations,
                createdAt: item.createdAt,
                updatedAt: new Date(),
            })),
            total: output.total,
            page: output.page,
            pageSize: output.pageSize,
        };
    }
    async get(id) {
        const output = await this.getOrder.execute(id);
        return {
            id: output.id,
            machineId: output.machineId,
            type: output.type,
            status: output.status,
            location: output.location,
            cost: output.cost,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
    async start(id) {
        const output = await this.startOrder.execute(id);
        return {
            id: output.id,
            machineId: output.machineId,
            type: output.type,
            status: output.status,
            location: output.location,
            cost: output.cost,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
    async complete(id) {
        const output = await this.completeOrder.execute(id);
        return {
            id: output.id,
            machineId: output.machineId,
            type: output.type,
            status: output.status,
            location: output.location,
            cost: output.cost,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
    async delete(id) {
        await this.deleteOrder.execute(id);
    }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Crear orden de mantenimiento', description: 'Crea una nueva orden de mantenimiento para una máquina' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Orden de mantenimiento creada exitosamente', type: maintenance_order_response_dto_1.MaintenanceOrderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_maintenance_order_request_dto_1.CreateMaintenanceOrderRequestDto]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar órdenes de mantenimiento', description: 'Obtiene una lista paginada de órdenes de mantenimiento' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Número de página' }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de órdenes obtenida' }),
    __param(0, (0, get_tenant_id_decorator_1.GetTenantId)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Query)('machineId')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('type')),
    __param(6, (0, common_1.Query)('technicianId')),
    __param(7, (0, common_1.Query)('providerId')),
    __param(8, (0, common_1.Query)('scheduledFrom')),
    __param(9, (0, common_1.Query)('scheduledTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener orden de mantenimiento', description: 'Obtiene los detalles de una orden de mantenimiento por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la orden de mantenimiento', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orden encontrada', type: maintenance_order_response_dto_1.MaintenanceOrderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Orden no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar mantenimiento', description: 'Marca una orden de mantenimiento como iniciada' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la orden de mantenimiento', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mantenimiento iniciado', type: maintenance_order_response_dto_1.MaintenanceOrderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Orden no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "start", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Completar mantenimiento', description: 'Marca una orden de mantenimiento como completada' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la orden de mantenimiento', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mantenimiento completado', type: maintenance_order_response_dto_1.MaintenanceOrderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Orden no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "complete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar orden de mantenimiento', description: 'Elimina una orden de mantenimiento' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la orden de mantenimiento', type: String }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Orden eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Orden no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "delete", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('maintenance-orders'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)('maintenance-orders'),
    (0, common_1.UseGuards)(clerk_auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [create_maintenance_order_use_case_1.CreateMaintenanceOrderUseCase,
        list_maintenance_orders_use_case_1.ListMaintenanceOrdersUseCase,
        get_maintenance_order_use_case_1.GetMaintenanceOrderUseCase,
        start_maintenance_order_use_case_1.StartMaintenanceOrderUseCase,
        complete_maintenance_order_use_case_1.CompleteMaintenanceOrderUseCase,
        delete_maintenance_order_use_case_1.DeleteMaintenanceOrderUseCase])
], MaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map