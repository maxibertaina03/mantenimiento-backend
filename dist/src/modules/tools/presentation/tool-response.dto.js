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
exports.ToolDetailResponseDto = exports.ToolLoanResponseDto = exports.PaginatedToolResponseDto = exports.ToolResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
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
    tenantId;
    createdAt;
    updatedAt;
    static from(t) {
        return {
            id: t.id,
            code: t.code,
            name: t.name,
            description: t.description,
            brand: t.brand,
            model: t.model,
            serialNumber: t.serialNumber,
            status: t.status,
            location: t.location,
            observations: t.observations,
            acquiredAt: t.acquiredAt?.toISOString() ?? null,
            tenantId: t.tenantId,
            createdAt: t.createdAt.toISOString(),
            updatedAt: t.updatedAt.toISOString(),
        };
    }
}
exports.ToolResponseDto = ToolResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['AVAILABLE', 'ON_LOAN', 'IN_REPAIR', 'OUT_OF_SERVICE'] }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "observations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'date-time' }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "acquiredAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], ToolResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], ToolResponseDto.prototype, "updatedAt", void 0);
class PaginatedToolResponseDto {
    items;
    total;
    page;
    pageSize;
}
exports.PaginatedToolResponseDto = PaginatedToolResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ToolResponseDto] }),
    __metadata("design:type", Array)
], PaginatedToolResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedToolResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedToolResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedToolResponseDto.prototype, "pageSize", void 0);
class ToolLoanResponseDto {
    id;
    toolId;
    responsibleId;
    loanedAt;
    expectedAt;
    returnedAt;
    status;
    notes;
    tenantId;
    createdAt;
    static from(l) {
        return {
            id: l.id,
            toolId: l.toolId,
            responsibleId: l.responsibleId,
            loanedAt: l.loanedAt.toISOString(),
            expectedAt: l.expectedAt?.toISOString() ?? null,
            returnedAt: l.returnedAt?.toISOString() ?? null,
            status: l.status,
            notes: l.notes,
            tenantId: l.tenantId,
            createdAt: l.createdAt.toISOString(),
        };
    }
}
exports.ToolLoanResponseDto = ToolLoanResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ToolLoanResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ToolLoanResponseDto.prototype, "toolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ToolLoanResponseDto.prototype, "responsibleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], ToolLoanResponseDto.prototype, "loanedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'date-time' }),
    __metadata("design:type", Object)
], ToolLoanResponseDto.prototype, "expectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'date-time' }),
    __metadata("design:type", Object)
], ToolLoanResponseDto.prototype, "returnedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['ACTIVE', 'RETURNED', 'LOST'] }),
    __metadata("design:type", String)
], ToolLoanResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ToolLoanResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], ToolLoanResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], ToolLoanResponseDto.prototype, "createdAt", void 0);
class ToolDetailResponseDto {
    tool;
    activeLoan;
}
exports.ToolDetailResponseDto = ToolDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: ToolResponseDto }),
    __metadata("design:type", ToolResponseDto)
], ToolDetailResponseDto.prototype, "tool", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ToolLoanResponseDto, nullable: true }),
    __metadata("design:type", Object)
], ToolDetailResponseDto.prototype, "activeLoan", void 0);
//# sourceMappingURL=tool-response.dto.js.map