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
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const register_material_use_case_1 = require("../application/register-material.use-case");
const update_material_use_case_1 = require("../application/update-material.use-case");
const register_movement_use_case_1 = require("../application/register-movement.use-case");
const list_materials_use_case_1 = require("../application/list-materials.use-case");
const get_material_use_case_1 = require("../application/get-material.use-case");
const list_movements_use_case_1 = require("../application/list-movements.use-case");
const delete_material_use_case_1 = require("../application/delete-material.use-case");
const material_request_dto_1 = require("./material-request.dto");
const material_response_dto_1 = require("./material-response.dto");
let MaterialsController = class MaterialsController {
    registerUC;
    updateUC;
    movementUC;
    listUC;
    getUC;
    listMovUC;
    deleteUC;
    constructor(registerUC, updateUC, movementUC, listUC, getUC, listMovUC, deleteUC) {
        this.registerUC = registerUC;
        this.updateUC = updateUC;
        this.movementUC = movementUC;
        this.listUC = listUC;
        this.getUC = getUC;
        this.listMovUC = listMovUC;
        this.deleteUC = deleteUC;
    }
    async list(q) {
        const r = await this.listUC.execute(q);
        return {
            items: r.items.map(material_response_dto_1.MaterialResponseDto.from),
            total: r.total,
            page: r.page,
            pageSize: r.pageSize,
        };
    }
    async get(id) {
        return material_response_dto_1.MaterialResponseDto.from(await this.getUC.execute(id));
    }
    async movements(id, page, pageSize) {
        const list = await this.listMovUC.execute(id, page ? Number(page) : 1, pageSize ? Number(pageSize) : 20);
        return list.map(material_response_dto_1.StockMovementResponseDto.from);
    }
    async create(dto, user) {
        return material_response_dto_1.MaterialResponseDto.from(await this.registerUC.execute(dto, user.id, user.tenantId));
    }
    async update(id, dto, user) {
        return material_response_dto_1.MaterialResponseDto.from(await this.updateUC.execute(id, dto, user.id, user.tenantId));
    }
    async registerMovement(id, dto, user) {
        const result = await this.movementUC.execute(id, dto, user.id, user.tenantId);
        return {
            material: material_response_dto_1.MaterialResponseDto.from(result.material),
            movement: material_response_dto_1.StockMovementResponseDto.from(result.movement),
        };
    }
    async remove(id, user) {
        await this.deleteUC.execute(id, user.id, user.tenantId);
    }
};
exports.MaterialsController = MaterialsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: material_response_dto_1.PaginatedMaterialResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_request_dto_1.ListMaterialsQueryDto]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: material_response_dto_1.MaterialResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':id/movements'),
    (0, swagger_1.ApiOkResponse)({ type: [material_response_dto_1.StockMovementResponseDto] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "movements", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_request_dto_1.CreateMaterialDto, Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, material_request_dto_1.UpdateMaterialDto, Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/movements'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, material_request_dto_1.RegisterMovementDto, Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "registerMovement", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "remove", null);
exports.MaterialsController = MaterialsController = __decorate([
    (0, swagger_1.ApiTags)('materials'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'materials', version: '1' }),
    __metadata("design:paramtypes", [register_material_use_case_1.RegisterMaterialUseCase,
        update_material_use_case_1.UpdateMaterialUseCase,
        register_movement_use_case_1.RegisterMovementUseCase,
        list_materials_use_case_1.ListMaterialsUseCase,
        get_material_use_case_1.GetMaterialUseCase,
        list_movements_use_case_1.ListMovementsUseCase,
        delete_material_use_case_1.DeleteMaterialUseCase])
], MaterialsController);
//# sourceMappingURL=materials.controller.js.map