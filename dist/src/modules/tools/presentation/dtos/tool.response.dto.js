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
exports.ToolResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tool_status_vo_1 = require("../../domain/value-objects/tool-status.vo");
class ToolResponseDto {
    id;
    code;
    name;
    description;
    brand;
    model;
    serialNumber;
    status;
    location;
    observations;
    acquiredAt;
    createdAt;
    updatedAt;
}
exports.ToolResponseDto = ToolResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único de la herramienta', format: 'uuid' }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código único de la herramienta', example: 'TOOL-001' }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la herramienta', example: 'Destornillador Phillips' }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción de la herramienta', nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marca de la herramienta', nullable: true, example: 'Stanley' }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Modelo de la herramienta', nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de serie', nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado de la herramienta',
        enum: ['AVAILABLE', 'ON_LOAN', 'IN_REPAIR', 'OUT_OF_SERVICE'],
    }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ubicación de la herramienta', nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observaciones', nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "observations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de adquisición', format: 'date-time', nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "acquiredAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', format: 'date-time' }),
    __metadata("design:type", Date)
], ToolResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Última actualización', format: 'date-time' }),
    __metadata("design:type", Date)
], ToolResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=tool.response.dto.js.map