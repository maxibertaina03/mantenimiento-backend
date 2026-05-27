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
exports.ListMachinesQueryDto = exports.LogMachineHoursDto = exports.ChangeMachineStatusDto = exports.UpdateMachineDto = exports.CreateMachineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/;
class CreateMachineDto {
    code;
    name;
    brand;
    model;
    serialNumber;
    initialUsageHours;
    location;
    responsibleId;
    notes;
    preventiveIntervalHours;
}
exports.CreateMachineDto = CreateMachineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 2, maxLength: 32 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 32),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 2, maxLength: 120 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 120),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMachineDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMachineDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMachineDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Horas iniciales (decimal)', example: '0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(DECIMAL_REGEX, { message: 'initialUsageHours debe ser decimal con hasta 2 decimales' }),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "initialUsageHours", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMachineDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], CreateMachineDto.prototype, "responsibleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMachineDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Intervalo preventivo (horas)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(DECIMAL_REGEX, { message: 'preventiveIntervalHours debe ser decimal' }),
    __metadata("design:type", Object)
], CreateMachineDto.prototype, "preventiveIntervalHours", void 0);
class UpdateMachineDto extends (0, swagger_1.PartialType)(CreateMachineDto) {
}
exports.UpdateMachineDto = UpdateMachineDto;
class ChangeMachineStatusDto {
    status;
    reason;
}
exports.ChangeMachineStatusDto = ChangeMachineStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MachineStatus }),
    (0, class_validator_1.IsEnum)(client_1.MachineStatus),
    __metadata("design:type", String)
], ChangeMachineStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangeMachineStatusDto.prototype, "reason", void 0);
class LogMachineHoursDto {
    hoursAfter;
    notes;
}
exports.LogMachineHoursDto = LogMachineHoursDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lectura nueva del contador de horas (decimal)', example: '1250.50' }),
    (0, class_validator_1.IsNumberString)({ no_symbols: false }),
    (0, class_validator_1.Matches)(DECIMAL_REGEX, { message: 'hoursAfter debe ser decimal' }),
    __metadata("design:type", String)
], LogMachineHoursDto.prototype, "hoursAfter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], LogMachineHoursDto.prototype, "notes", void 0);
class ListMachinesQueryDto {
    page;
    pageSize;
    status;
    responsibleId;
    search;
}
exports.ListMachinesQueryDto = ListMachinesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListMachinesQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100, default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListMachinesQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.MachineStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MachineStatus),
    __metadata("design:type", String)
], ListMachinesQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ListMachinesQueryDto.prototype, "responsibleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Búsqueda por code/name/serialNumber' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListMachinesQueryDto.prototype, "search", void 0);
//# sourceMappingURL=machine-request.dto.js.map