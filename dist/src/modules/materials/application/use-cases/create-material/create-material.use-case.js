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
exports.CreateMaterialUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const library_1 = require("@prisma/client/runtime/library");
const material_entity_1 = require("../../../domain/entities/material.entity");
const material_repository_1 = require("../../../domain/repositories/material.repository");
const material_unit_vo_1 = require("../../../domain/value-objects/material-unit.vo");
const invalid_material_exception_1 = require("../../../domain/exceptions/invalid-material.exception");
const material_app_mapper_1 = require("../../mappers/material-app.mapper");
let CreateMaterialUseCase = class CreateMaterialUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const material = new material_entity_1.Material((0, uuid_1.v4)(), input.code, input.name, input.description ?? null, input.unit ?? material_unit_vo_1.MaterialUnit.UNIT, input.stock ?? new library_1.Decimal(0), input.minStock ?? new library_1.Decimal(0), input.location ?? null, null);
        const existing = await this.repository.findByCode(material.getCode());
        if (existing) {
            throw new invalid_material_exception_1.InvalidMaterialException(`Material with code "${material.getCode()}" already exists`);
        }
        await this.repository.save(material);
        return material_app_mapper_1.MaterialAppMapper.toOutput(material);
    }
};
exports.CreateMaterialUseCase = CreateMaterialUseCase;
exports.CreateMaterialUseCase = CreateMaterialUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(material_repository_1.MATERIAL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateMaterialUseCase);
//# sourceMappingURL=create-material.use-case.js.map