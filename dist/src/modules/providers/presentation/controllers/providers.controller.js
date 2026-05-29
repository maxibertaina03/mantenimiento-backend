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
const create_provider_use_case_1 = require("../../application/use-cases/create-provider/create-provider.use-case");
const list_providers_use_case_1 = require("../../application/use-cases/list-providers/list-providers.use-case");
const get_provider_use_case_1 = require("../../application/use-cases/get-provider/get-provider.use-case");
const update_provider_use_case_1 = require("../../application/use-cases/update-provider/update-provider.use-case");
const delete_provider_use_case_1 = require("../../application/use-cases/delete-provider/delete-provider.use-case");
const create_provider_request_dto_1 = require("../dtos/create-provider.request.dto");
const update_provider_request_dto_1 = require("../dtos/update-provider.request.dto");
const provider_response_dto_1 = require("../dtos/provider.response.dto");
const create_provider_validation_pipe_1 = require("../pipes/create-provider-validation.pipe");
const provider_presenter_mapper_1 = require("../mappers/provider-presenter.mapper");
const clerk_auth_guard_1 = require("../../../../common/guards/clerk-auth.guard");
const get_tenant_id_decorator_1 = require("../../../../common/decorators/get-tenant-id.decorator");
let ProvidersController = class ProvidersController {
    createProvider;
    listProviders;
    getProvider;
    updateProvider;
    deleteProvider;
    constructor(createProvider, listProviders, getProvider, updateProvider, deleteProvider) {
        this.createProvider = createProvider;
        this.listProviders = listProviders;
        this.getProvider = getProvider;
        this.updateProvider = updateProvider;
        this.deleteProvider = deleteProvider;
    }
    async create(dto) {
        const output = await this.createProvider.execute({
            name: dto.name,
            taxId: dto.taxId ?? null,
            contactName: dto.contactName ?? null,
            phone: dto.phone ?? null,
            email: dto.email ?? null,
            address: dto.address ?? null,
            serviceType: dto.serviceType,
            notes: dto.notes ?? null,
        });
        return provider_presenter_mapper_1.ProviderPresenterMapper.toResponse(output);
    }
    async list(tenantId, page, pageSize, _search, _serviceType, _active) {
        const output = await this.listProviders.execute({
            tenantId,
            page,
            pageSize,
        });
        return {
            items: output.items.map((item) => provider_presenter_mapper_1.ProviderPresenterMapper.toResponse(item)),
            total: output.total,
            page: output.page,
            pageSize: output.pageSize,
        };
    }
    async get(id) {
        const output = await this.getProvider.execute(id);
        return provider_presenter_mapper_1.ProviderPresenterMapper.toResponse(output);
    }
    async update(id, dto) {
        const output = await this.updateProvider.execute({
            id,
            name: dto.name,
            contactName: dto.contactName,
            phone: dto.phone,
            email: dto.email,
            address: dto.address,
        });
        return provider_presenter_mapper_1.ProviderPresenterMapper.toResponse(output);
    }
    async delete(id) {
        await this.deleteProvider.execute(id);
    }
};
exports.ProvidersController = ProvidersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(create_provider_validation_pipe_1.CreateProviderValidationPipe, new common_1.ValidationPipe({ whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Crear proveedor', description: 'Crea un nuevo proveedor' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Proveedor creado exitosamente', type: provider_response_dto_1.ProviderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_provider_request_dto_1.CreateProviderRequestDto]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar proveedores', description: 'Obtiene una lista paginada de proveedores' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Número de página' }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de proveedores obtenida' }),
    __param(0, (0, get_tenant_id_decorator_1.GetTenantId)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('serviceType')),
    __param(5, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener proveedor', description: 'Obtiene los detalles de un proveedor por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del proveedor', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Proveedor encontrado', type: provider_response_dto_1.ProviderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar proveedor', description: 'Actualiza los datos de un proveedor' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del proveedor', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Proveedor actualizado', type: provider_response_dto_1.ProviderResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_provider_request_dto_1.UpdateProviderRequestDto]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar proveedor', description: 'Elimina un proveedor' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del proveedor', type: String }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Proveedor eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "delete", null);
exports.ProvidersController = ProvidersController = __decorate([
    (0, swagger_1.ApiTags)('providers'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)('providers'),
    (0, common_1.UseGuards)(clerk_auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [create_provider_use_case_1.CreateProviderUseCase,
        list_providers_use_case_1.ListProvidersUseCase,
        get_provider_use_case_1.GetProviderUseCase,
        update_provider_use_case_1.UpdateProviderUseCase,
        delete_provider_use_case_1.DeleteProviderUseCase])
], ProvidersController);
//# sourceMappingURL=providers.controller.js.map