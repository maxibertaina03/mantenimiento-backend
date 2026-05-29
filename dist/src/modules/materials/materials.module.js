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
const materials_controller_1 = require("./presentation/controllers/materials.controller");
const create_material_use_case_1 = require("./application/use-cases/create-material/create-material.use-case");
const list_materials_use_case_1 = require("./application/use-cases/list-materials/list-materials.use-case");
const get_material_use_case_1 = require("./application/use-cases/get-material/get-material.use-case");
const update_material_use_case_1 = require("./application/use-cases/update-material/update-material.use-case");
const delete_material_use_case_1 = require("./application/use-cases/delete-material/delete-material.use-case");
const prisma_material_repository_1 = require("./infrastructure/repositories/prisma-material.repository");
const material_repository_1 = require("./domain/repositories/material.repository");
const prisma_module_1 = require("../../infrastructure/prisma/prisma.module");
let MaterialsModule = class MaterialsModule {
};
exports.MaterialsModule = MaterialsModule;
exports.MaterialsModule = MaterialsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [materials_controller_1.MaterialsController],
        providers: [
            create_material_use_case_1.CreateMaterialUseCase,
            list_materials_use_case_1.ListMaterialsUseCase,
            get_material_use_case_1.GetMaterialUseCase,
            update_material_use_case_1.UpdateMaterialUseCase,
            delete_material_use_case_1.DeleteMaterialUseCase,
            {
                provide: material_repository_1.MATERIAL_REPOSITORY,
                useClass: prisma_material_repository_1.PrismaMaterialRepository,
            },
        ],
        exports: [create_material_use_case_1.CreateMaterialUseCase, list_materials_use_case_1.ListMaterialsUseCase, get_material_use_case_1.GetMaterialUseCase, update_material_use_case_1.UpdateMaterialUseCase, delete_material_use_case_1.DeleteMaterialUseCase],
    })
], MaterialsModule);
//# sourceMappingURL=materials.module.js.map