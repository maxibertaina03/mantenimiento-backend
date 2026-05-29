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
exports.ListMaterialsUseCase = void 0;
const common_1 = require("@nestjs/common");
const material_repository_1 = require("../../../domain/repositories/material.repository");
const material_app_mapper_1 = require("../../mappers/material-app.mapper");
let ListMaterialsUseCase = class ListMaterialsUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const materials = await this.repository.findAll(input.tenantId);
        const page = Number(input.page) > 0 ? Number(input.page) : 1;
        const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 10;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedMaterials = materials.slice(start, end);
        const items = paginatedMaterials.map((m) => material_app_mapper_1.MaterialAppMapper.toOutput(m));
        return {
            items,
            total: materials.length,
            page,
            pageSize,
        };
    }
};
exports.ListMaterialsUseCase = ListMaterialsUseCase;
exports.ListMaterialsUseCase = ListMaterialsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(material_repository_1.MATERIAL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListMaterialsUseCase);
//# sourceMappingURL=list-materials.use-case.js.map