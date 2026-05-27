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
exports.PaginatedMaintenanceResponseDto = exports.MaintenanceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MaintenanceResponseDto {
    id;
    machineId;
    type;
    status;
    location;
    externalLocation;
    scheduledFor;
    startedAt;
    completedAt;
    machineHoursSnapshot;
    technicianId;
    providerId;
    cost;
    currency;
    description;
    observations;
    tenantId;
    createdAt;
    updatedAt;
    static from(o) {
        return {
            id: o.id,
            machineId: o.machineId,
            type: o.type,
            status: o.status,
            location: o.location,
            externalLocation: o.externalLocation,
            scheduledFor: o.scheduledFor?.toISOString() ?? null,
            startedAt: o.startedAt?.toISOString() ?? null,
            completedAt: o.completedAt?.toISOString() ?? null,
            machineHoursSnapshot: o.machineHoursSnapshot?.toString() ?? null,
            technicianId: o.technicianId,
            providerId: o.providerId,
            cost: o.cost?.toString() ?? null,
            currency: o.currency,
            description: o.description,
            observations: o.observations,
            tenantId: o.tenantId,
            createdAt: o.createdAt.toISOString(),
            updatedAt: o.updatedAt.toISOString(),
        };
    }
}
exports.MaintenanceResponseDto = MaintenanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "machineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['PREVENTIVE', 'CORRECTIVE'] }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['INTERNAL', 'EXTERNAL'] }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "externalLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'date-time' }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "scheduledFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'date-time' }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'date-time' }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "machineHoursSnapshot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "observations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], MaintenanceResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "updatedAt", void 0);
class PaginatedMaintenanceResponseDto {
    items;
    total;
    page;
    pageSize;
}
exports.PaginatedMaintenanceResponseDto = PaginatedMaintenanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MaintenanceResponseDto] }),
    __metadata("design:type", Array)
], PaginatedMaintenanceResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMaintenanceResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMaintenanceResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedMaintenanceResponseDto.prototype, "pageSize", void 0);
//# sourceMappingURL=maintenance-response.dto.js.map