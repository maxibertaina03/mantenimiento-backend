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
exports.PaginatedProviderResponseDto = exports.ProviderResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProviderResponseDto {
    id;
    name;
    taxId;
    contactName;
    phone;
    email;
    address;
    serviceType;
    notes;
    active;
    tenantId;
    createdAt;
    updatedAt;
    static from(p) {
        return {
            id: p.id,
            name: p.name,
            taxId: p.taxId,
            contactName: p.contactName,
            phone: p.phone,
            email: p.email,
            address: p.address,
            serviceType: p.serviceType,
            notes: p.notes,
            active: p.active,
            tenantId: p.tenantId,
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
        };
    }
}
exports.ProviderResponseDto = ProviderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "contactName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['MAINTENANCE', 'PARTS', 'TOOLS', 'MATERIALS', 'CONSULTING', 'OTHER'],
    }),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProviderResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "updatedAt", void 0);
class PaginatedProviderResponseDto {
    items;
    total;
    page;
    pageSize;
}
exports.PaginatedProviderResponseDto = PaginatedProviderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProviderResponseDto] }),
    __metadata("design:type", Array)
], PaginatedProviderResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedProviderResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedProviderResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedProviderResponseDto.prototype, "pageSize", void 0);
//# sourceMappingURL=provider-response.dto.js.map