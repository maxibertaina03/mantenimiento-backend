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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const material_unit_vo_1 = require("../../domain/value-objects/material-unit.vo");
const library_1 = require("@prisma/client/runtime/library");
class MaterialResponseDto {
    id;
    code;
    name;
    description;
    unit;
    stock;
    minStock;
    location;
    createdAt;
    updatedAt;
}
exports.MaterialResponseDto = MaterialResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único del material', format: 'uuid' }),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código único del material', example: 'MAT-001' }),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del material', example: 'Acero inoxidable' }),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción del material', nullable: true }),
    __metadata("design:type", Object)
], MaterialResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unidad de medida', enum: Object.values(material_unit_vo_1.MaterialUnit) }),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Stock actual', type: 'number' }),
    __metadata("design:type", library_1.Decimal)
], MaterialResponseDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Stock mínimo requerido', type: 'number' }),
    __metadata("design:type", library_1.Decimal)
], MaterialResponseDto.prototype, "minStock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ubicación del material', nullable: true, example: 'Bodega A' }),
    __metadata("design:type", Object)
], MaterialResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', format: 'date-time' }),
    __metadata("design:type", Date)
], MaterialResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Última actualización', format: 'date-time' }),
    __metadata("design:type", Date)
], MaterialResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=material.response.dto.js.map