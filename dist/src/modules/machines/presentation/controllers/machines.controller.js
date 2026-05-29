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
const library_1 = require("@prisma/client/runtime/library");
const create_machine_use_case_1 = require("../../application/use-cases/create-machine/create-machine.use-case");
const list_machines_use_case_1 = require("../../application/use-cases/list-machines/list-machines.use-case");
const get_machine_use_case_1 = require("../../application/use-cases/get-machine/get-machine.use-case");
const update_machine_use_case_1 = require("../../application/use-cases/update-machine/update-machine.use-case");
const delete_machine_use_case_1 = require("../../application/use-cases/delete-machine/delete-machine.use-case");
const create_machine_request_dto_1 = require("../dtos/create-machine.request.dto");
const update_machine_request_dto_1 = require("../dtos/update-machine.request.dto");
const machine_response_dto_1 = require("../dtos/machine.response.dto");
const machine_presenter_mapper_1 = require("../mappers/machine-presenter.mapper");
const clerk_auth_guard_1 = require("../../../../common/guards/clerk-auth.guard");
const get_tenant_id_decorator_1 = require("../../../../common/decorators/get-tenant-id.decorator");
let MachinesController = class MachinesController {
    createMachine;
    listMachines;
    getMachine;
    updateMachine;
    deleteMachine;
    constructor(createMachine, listMachines, getMachine, updateMachine, deleteMachine) {
        this.createMachine = createMachine;
        this.listMachines = listMachines;
        this.getMachine = getMachine;
        this.updateMachine = updateMachine;
        this.deleteMachine = deleteMachine;
    }
    async create(dto) {
        const output = await this.createMachine.execute({
            code: dto.code,
            name: dto.name,
            brand: dto.brand ?? null,
            model: dto.model ?? null,
            serialNumber: dto.serialNumber ?? null,
            status: dto.status,
            usageHours: dto.usageHours ? new library_1.Decimal(dto.usageHours) : undefined,
            location: dto.location ?? null,
            responsibleId: dto.responsibleId ?? null,
            notes: dto.notes ?? null,
            preventiveIntervalHours: dto.preventiveIntervalHours ? new library_1.Decimal(dto.preventiveIntervalHours) : null,
        });
        return machine_presenter_mapper_1.MachinePresenterMapper.toResponse(output);
    }
    async list(tenantId, page, pageSize, _status, _responsibleId, _search) {
        const output = await this.listMachines.execute({
            tenantId,
            page: page ? Number(page) : undefined,
            pageSize: pageSize ? Number(pageSize) : undefined,
        });
        return {
            items: output.items.map((item) => machine_presenter_mapper_1.MachinePresenterMapper.toResponse(item)),
            total: output.total,
            page: output.page,
            pageSize: output.pageSize,
        };
    }
    async preventiveAlerts(_tenantId) {
        return [];
    }
    async get(id) {
        const output = await this.getMachine.execute(id);
        return machine_presenter_mapper_1.MachinePresenterMapper.toResponse(output);
    }
    async update(id, dto) {
        const output = await this.updateMachine.execute({
            id,
            name: dto.name,
            location: dto.location,
        });
        return machine_presenter_mapper_1.MachinePresenterMapper.toResponse(output);
    }
    async delete(id) {
        await this.deleteMachine.execute(id);
    }
};
exports.MachinesController = MachinesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Crear máquina', description: 'Crea una nueva máquina en el inventario' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Máquina creada exitosamente', type: machine_response_dto_1.MachineResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_machine_request_dto_1.CreateMachineRequestDto]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar máquinas', description: 'Obtiene una lista paginada de máquinas' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Número de página' }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de máquinas obtenida' }),
    __param(0, (0, get_tenant_id_decorator_1.GetTenantId)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('responsibleId')),
    __param(5, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('preventive-alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Alertas preventivas', description: 'Lista máquinas que necesitan mantenimiento preventivo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de alertas obtenida' }),
    __param(0, (0, get_tenant_id_decorator_1.GetTenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "preventiveAlerts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener máquina', description: 'Obtiene los detalles de una máquina por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la máquina', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Máquina encontrada', type: machine_response_dto_1.MachineResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Máquina no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar máquina', description: 'Actualiza los datos de una máquina' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la máquina', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Máquina actualizada', type: machine_response_dto_1.MachineResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Máquina no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_machine_request_dto_1.UpdateMachineRequestDto]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar máquina', description: 'Elimina una máquina del inventario' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la máquina', type: String }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Máquina eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Máquina no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "delete", null);
exports.MachinesController = MachinesController = __decorate([
    (0, swagger_1.ApiTags)('machines'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)('machines'),
    (0, common_1.UseGuards)(clerk_auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [create_machine_use_case_1.CreateMachineUseCase,
        list_machines_use_case_1.ListMachinesUseCase,
        get_machine_use_case_1.GetMachineUseCase,
        update_machine_use_case_1.UpdateMachineUseCase,
        delete_machine_use_case_1.DeleteMachineUseCase])
], MachinesController);
//# sourceMappingURL=machines.controller.js.map