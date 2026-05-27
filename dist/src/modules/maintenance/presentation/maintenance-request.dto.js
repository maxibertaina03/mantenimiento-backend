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
exports.ListMaintenanceQueryDto = exports.CancelMaintenanceDto = exports.CompleteMaintenanceDto = exports.UpdateMaintenanceDto = exports.ScheduleMaintenanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/;
class ScheduleMaintenanceDto {
    machineId;
    type;
    location;
    externalLocation;
    scheduledFor;
    technicianId;
    providerId;
    description;
}
exports.ScheduleMaintenanceDto = ScheduleMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ScheduleMaintenanceDto.prototype, "machineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MaintenanceType }),
    (0, class_validator_1.IsEnum)(client_1.MaintenanceType),
    __metadata("design:type", String)
], ScheduleMaintenanceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MaintenanceLocation }),
    (0, class_validator_1.IsEnum)(client_1.MaintenanceLocation),
    __metadata("design:type", String)
], ScheduleMaintenanceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ScheduleMaintenanceDto.prototype, "externalLocation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], ScheduleMaintenanceDto.prototype, "scheduledFor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], ScheduleMaintenanceDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], ScheduleMaintenanceDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ScheduleMaintenanceDto.prototype, "description", void 0);
class UpdateMaintenanceDto {
    location;
    externalLocation;
    scheduledFor;
    technicianId;
    providerId;
    description;
    observations;
}
exports.UpdateMaintenanceDto = UpdateMaintenanceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.MaintenanceLocation }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MaintenanceLocation),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateMaintenanceDto.prototype, "externalLocation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], UpdateMaintenanceDto.prototype, "scheduledFor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], UpdateMaintenanceDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], UpdateMaintenanceDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateMaintenanceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateMaintenanceDto.prototype, "observations", void 0);
class CompleteMaintenanceDto {
    machineHoursSnapshot;
    cost;
    currency;
    observations;
}
exports.CompleteMaintenanceDto = CompleteMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horas del contador al cierre del mantenimiento', example: '1200.50' }),
    (0, class_validator_1.Matches)(DECIMAL_REGEX, { message: 'machineHoursSnapshot debe ser decimal' }),
    __metadata("design:type", String)
], CompleteMaintenanceDto.prototype, "machineHoursSnapshot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(DECIMAL_REGEX, { message: 'cost debe ser decimal' }),
    __metadata("design:type", Object)
], CompleteMaintenanceDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'ARS', maxLength: 8 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CompleteMaintenanceDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CompleteMaintenanceDto.prototype, "observations", void 0);
class CancelMaintenanceDto {
    reason;
}
exports.CancelMaintenanceDto = CancelMaintenanceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CancelMaintenanceDto.prototype, "reason", void 0);
class ListMaintenanceQueryDto {
    page;
    pageSize;
    machineId;
    status;
    type;
    technicianId;
    providerId;
    scheduledFrom;
    scheduledTo;
}
exports.ListMaintenanceQueryDto = ListMaintenanceQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListMaintenanceQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100, default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListMaintenanceQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ListMaintenanceQueryDto.prototype, "machineId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.MaintenanceStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MaintenanceStatus),
    __metadata("design:type", String)
], ListMaintenanceQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.MaintenanceType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MaintenanceType),
    __metadata("design:type", String)
], ListMaintenanceQueryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ListMaintenanceQueryDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ListMaintenanceQueryDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListMaintenanceQueryDto.prototype, "scheduledFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListMaintenanceQueryDto.prototype, "scheduledTo", void 0);
//# sourceMappingURL=maintenance-request.dto.js.map