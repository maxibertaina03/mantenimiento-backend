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
exports.ListMaterialsQueryDto = exports.RegisterMovementDto = exports.UpdateMaterialDto = exports.CreateMaterialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
const DECIMAL_REGEX = /^\d+(\.\d{1,4})?$/;
class CreateMaterialDto {
    code;
    name;
    description;
    unit;
    initialStock;
    minStock;
    location;
}
exports.CreateMaterialDto = CreateMaterialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 2, maxLength: 32 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 32),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 2, maxLength: 120 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 120),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMaterialDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MaterialUnit }),
    (0, class_validator_1.IsEnum)(client_1.MaterialUnit),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: '0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(DECIMAL_REGEX),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "initialStock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: '0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(DECIMAL_REGEX),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "minStock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMaterialDto.prototype, "location", void 0);
class UpdateMaterialDto extends (0, swagger_1.PartialType)(CreateMaterialDto) {
}
exports.UpdateMaterialDto = UpdateMaterialDto;
class RegisterMovementDto {
    type;
    quantity;
    adjustmentSign;
    reason;
    reference;
}
exports.RegisterMovementDto = RegisterMovementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.StockMovementType }),
    (0, class_validator_1.IsEnum)(client_1.StockMovementType),
    __metadata("design:type", String)
], RegisterMovementDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cantidad positiva (decimal hasta 4 decimales)', example: '12.5' }),
    (0, class_validator_1.Matches)(DECIMAL_REGEX),
    __metadata("design:type", String)
], RegisterMovementDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sólo para ADJUSTMENT: 1 (suma) o -1 (resta)', enum: [1, -1] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([1, -1]),
    __metadata("design:type", Number)
], RegisterMovementDto.prototype, "adjustmentSign", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], RegisterMovementDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], RegisterMovementDto.prototype, "reference", void 0);
class ListMaterialsQueryDto {
    page;
    pageSize;
    search;
    lowStockOnly;
}
exports.ListMaterialsQueryDto = ListMaterialsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListMaterialsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100, default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListMaterialsQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListMaterialsQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ListMaterialsQueryDto.prototype, "lowStockOnly", void 0);
//# sourceMappingURL=material-request.dto.js.map