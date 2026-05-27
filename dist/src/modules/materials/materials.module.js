"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsModule = void 0;
const common_1 = require("@nestjs/common");
const materials_controller_1 = require("./presentation/materials.controller");
const material_repository_1 = require("./domain/material.repository");
const prisma_material_repository_1 = require("./infrastructure/prisma-material.repository");
const register_material_use_case_1 = require("./application/register-material.use-case");
const update_material_use_case_1 = require("./application/update-material.use-case");
const register_movement_use_case_1 = require("./application/register-movement.use-case");
const list_materials_use_case_1 = require("./application/list-materials.use-case");
const get_material_use_case_1 = require("./application/get-material.use-case");
const list_movements_use_case_1 = require("./application/list-movements.use-case");
const delete_material_use_case_1 = require("./application/delete-material.use-case");
let MaterialsModule = class MaterialsModule {
};
exports.MaterialsModule = MaterialsModule;
exports.MaterialsModule = MaterialsModule = __decorate([
    (0, common_1.Module)({
        controllers: [materials_controller_1.MaterialsController],
        providers: [
            { provide: material_repository_1.MATERIAL_REPOSITORY, useClass: prisma_material_repository_1.PrismaMaterialRepository },
            register_material_use_case_1.RegisterMaterialUseCase,
            update_material_use_case_1.UpdateMaterialUseCase,
            register_movement_use_case_1.RegisterMovementUseCase,
            list_materials_use_case_1.ListMaterialsUseCase,
            get_material_use_case_1.GetMaterialUseCase,
            list_movements_use_case_1.ListMovementsUseCase,
            delete_material_use_case_1.DeleteMaterialUseCase,
        ],
    })
], MaterialsModule);
//# sourceMappingURL=materials.module.js.map