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
exports.PreventiveAlertDto = exports.PaginatedMachineResponseDto = exports.MachineResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MachineResponseDto {
    id;
    code;
    name;
    brand;
    model;
    serialNumber;
    status;
    usageHours;
    location;
    responsibleId;
    notes;
    preventiveIntervalHours;
    lastPreventiveAtHours;
    preventiveDue;
    hoursUntilPreventive;
    tenantId;
    createdAt;
    updatedAt;
    static from(m) {
        return {
            id: m.id,
            code: m.code,
            name: m.name,
            brand: m.brand,
            model: m.model,
            serialNumber: m.serialNumber,
            status: m.status,
            usageHours: m.usageHours.toString(),
            location: m.location,
            responsibleId: m.responsibleId,
            notes: m.notes,
            preventiveIntervalHours: m.preventive.intervalHours?.toString() ?? null,
            lastPreventiveAtHours: m.preventive.lastDoneAtHours?.toString() ?? null,
            preventiveDue: m.isPreventiveDue(),
            hoursUntilPreventive: m.hoursUntilPreventive()?.toString() ?? null,
            tenantId: m.tenantId,
            createdAt: m.createdAt.toISOString(),
            updatedAt: m.updatedAt.toISOString(),
        };
    }
}
exports.MachineResponseDto = MachineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['OPERATIONAL', 'INTERNAL_MAINTENANCE', 'EXTERNAL_MAINTENANCE', 'OUT_OF_SERVICE'] }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Decimal string (preserva precisión)' }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "usageHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "responsibleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "preventiveIntervalHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "lastPreventiveAtHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], MachineResponseDto.prototype, "preventiveDue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, description: 'Negativo si está vencido' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "hoursUntilPreventive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "updatedAt", void 0);
class PaginatedMachineResponseDto {
    items;
    total;
    page;
    pageSize;
}
exports.PaginatedMachineResponseDto = PaginatedMachineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MachineResponseDto] }),
    __metadata("design:type", Array)
], PaginatedMachineResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMachineResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMachineResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMachineResponseDto.prototype, "pageSize", void 0);
class PreventiveAlertDto {
    machine;
    overdueByHours;
}
exports.PreventiveAlertDto = PreventiveAlertDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: MachineResponseDto }),
    __metadata("design:type", MachineResponseDto)
], PreventiveAlertDto.prototype, "machine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horas que excede el umbral preventivo' }),
    __metadata("design:type", String)
], PreventiveAlertDto.prototype, "overdueByHours", void 0);
//# sourceMappingURL=machine-response.dto.js.map