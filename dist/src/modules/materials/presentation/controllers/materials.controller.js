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
exports.MaterialsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const library_1 = require("@prisma/client/runtime/library");
const create_material_use_case_1 = require("../../application/use-cases/create-material/create-material.use-case");
const list_materials_use_case_1 = require("../../application/use-cases/list-materials/list-materials.use-case");
const get_material_use_case_1 = require("../../application/use-cases/get-material/get-material.use-case");
const update_material_use_case_1 = require("../../application/use-cases/update-material/update-material.use-case");
const delete_material_use_case_1 = require("../../application/use-cases/delete-material/delete-material.use-case");
const create_material_request_dto_1 = require("../dtos/create-material.request.dto");
const update_material_request_dto_1 = require("../dtos/update-material.request.dto");
const material_response_dto_1 = require("../dtos/material.response.dto");
const material_presenter_mapper_1 = require("../mappers/material-presenter.mapper");
const clerk_auth_guard_1 = require("../../../../common/guards/clerk-auth.guard");
const get_tenant_id_decorator_1 = require("../../../../common/decorators/get-tenant-id.decorator");
let MaterialsController = class MaterialsController {
    createMaterial;
    listMaterials;
    getMaterial;
    updateMaterial;
    deleteMaterial;
    constructor(createMaterial, listMaterials, getMaterial, updateMaterial, deleteMaterial) {
        this.createMaterial = createMaterial;
        this.listMaterials = listMaterials;
        this.getMaterial = getMaterial;
        this.updateMaterial = updateMaterial;
        this.deleteMaterial = deleteMaterial;
    }
    async create(dto) {
        const output = await this.createMaterial.execute({
            code: dto.code.toUpperCase(),
            name: dto.name,
            description: dto.description ?? null,
            unit: dto.unit,
            stock: dto.stock ? new library_1.Decimal(dto.stock) : undefined,
            minStock: dto.minStock ? new library_1.Decimal(dto.minStock) : undefined,
            location: dto.location ?? null,
        });
        return material_presenter_mapper_1.MaterialPresenterMapper.toResponse(output);
    }
    async list(tenantId, page, pageSize, _search, _lowStockOnly) {
        const output = await this.listMaterials.execute({
            tenantId,
            page: page ? Number(page) : undefined,
            pageSize: pageSize ? Number(pageSize) : undefined,
        });
        return {
            items: output.items.map((item) => material_presenter_mapper_1.MaterialPresenterMapper.toResponse(item)),
            total: output.total,
            page: output.page,
            pageSize: output.pageSize,
        };
    }
    async get(id) {
        const output = await this.getMaterial.execute(id);
        return material_presenter_mapper_1.MaterialPresenterMapper.toResponse(output);
    }
    async update(id, dto) {
        const output = await this.updateMaterial.execute({
            id,
            name: dto.name,
            location: dto.location,
        });
        return material_presenter_mapper_1.MaterialPresenterMapper.toResponse(output);
    }
    async delete(id) {
        await this.deleteMaterial.execute(id);
    }
};
exports.MaterialsController = MaterialsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Crear material', description: 'Crea un nuevo material en el inventario' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Material creado exitosamente', type: material_response_dto_1.MaterialResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_request_dto_1.CreateMaterialRequestDto]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar materiales', description: 'Obtiene una lista paginada de materiales' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Número de página' }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de materiales obtenida' }),
    __param(0, (0, get_tenant_id_decorator_1.GetTenantId)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('lowStockOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener material', description: 'Obtiene los detalles de un material por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del material', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Material encontrado', type: material_response_dto_1.MaterialResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Material no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar material', description: 'Actualiza los datos de un material' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del material', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Material actualizado', type: material_response_dto_1.MaterialResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Material no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_material_request_dto_1.UpdateMaterialRequestDto]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar material', description: 'Elimina un material del inventario' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del material', type: String }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Material eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Material no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "delete", null);
exports.MaterialsController = MaterialsController = __decorate([
    (0, swagger_1.ApiTags)('materials'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)('materials'),
    (0, common_1.UseGuards)(clerk_auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [create_material_use_case_1.CreateMaterialUseCase,
        list_materials_use_case_1.ListMaterialsUseCase,
        get_material_use_case_1.GetMaterialUseCase,
        update_material_use_case_1.UpdateMaterialUseCase,
        delete_material_use_case_1.DeleteMaterialUseCase])
], MaterialsController);
//# sourceMappingURL=materials.controller.js.map