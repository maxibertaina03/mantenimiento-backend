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
exports.StockMovementResponseDto = exports.PaginatedMaterialResponseDto = exports.MaterialResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MaterialResponseDto {
    id;
    code;
    name;
    description;
    unit;
    stock;
    minStock;
    isLowStock;
    location;
    tenantId;
    createdAt;
    updatedAt;
    static from(m) {
        return {
            id: m.id,
            code: m.code,
            name: m.name,
            description: m.description,
            unit: m.unit,
            stock: m.stock.toString(),
            minStock: m.minStock.toString(),
            isLowStock: m.isLowStock,
            location: m.location,
            tenantId: m.tenantId,
            createdAt: m.createdAt.toISOString(),
            updatedAt: m.updatedAt.toISOString(),
        };
    }
}
exports.MaterialResponseDto = MaterialResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaterialResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "minStock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], MaterialResponseDto.prototype, "isLowStock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaterialResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], MaterialResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], MaterialResponseDto.prototype, "updatedAt", void 0);
class PaginatedMaterialResponseDto {
    items;
    total;
    page;
    pageSize;
}
exports.PaginatedMaterialResponseDto = PaginatedMaterialResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MaterialResponseDto] }),
    __metadata("design:type", Array)
], PaginatedMaterialResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMaterialResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMaterialResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMaterialResponseDto.prototype, "pageSize", void 0);
class StockMovementResponseDto {
    id;
    materialId;
    type;
    quantity;
    stockAfter;
    reason;
    reference;
    createdById;
    createdAt;
    static from(m) {
        return {
            id: m.id,
            materialId: m.materialId,
            type: m.type,
            quantity: m.quantity.toString(),
            stockAfter: m.stockAfter.toString(),
            reason: m.reason,
            reference: m.reference,
            createdById: m.createdById,
            createdAt: m.createdAt.toISOString(),
        };
    }
}
exports.StockMovementResponseDto = StockMovementResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], StockMovementResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], StockMovementResponseDto.prototype, "materialId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockMovementResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockMovementResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockMovementResponseDto.prototype, "stockAfter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], StockMovementResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], StockMovementResponseDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], StockMovementResponseDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], StockMovementResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=material-response.dto.js.map