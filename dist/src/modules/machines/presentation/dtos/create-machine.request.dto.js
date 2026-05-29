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
exports.CreateMachineRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const machine_status_vo_1 = require("../../domain/value-objects/machine-status.vo");
class CreateMachineRequestDto {
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
}
exports.CreateMachineRequestDto = CreateMachineRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código único de la máquina', example: 'MAQ-001', minLength: 2, maxLength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Machine code must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Machine code cannot exceed 50 characters' }),
    __metadata("design:type", String)
], CreateMachineRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la máquina', example: 'Torno CNC', minLength: 3, maxLength: 255 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Machine name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Machine name cannot exceed 255 characters' }),
    __metadata("design:type", String)
], CreateMachineRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marca de la máquina', required: false, example: 'Haas' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMachineRequestDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Modelo de la máquina', required: false, example: 'VF-4' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMachineRequestDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de serie', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMachineRequestDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado inicial', enum: ['ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE'], required: false, default: 'ACTIVE' }),
    (0, class_validator_1.IsEnum)(machine_status_vo_1.MachineStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMachineRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horas de uso acumuladas', required: false, example: 1500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateMachineRequestDto.prototype, "usageHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ubicación de la máquina', required: false, example: 'Taller A' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMachineRequestDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del responsable', required: false, format: 'uuid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMachineRequestDto.prototype, "responsibleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notas adicionales', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMachineRequestDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Intervalo de mantenimiento preventivo en horas', required: false, example: 500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Object)
], CreateMachineRequestDto.prototype, "preventiveIntervalHours", void 0);
//# sourceMappingURL=create-machine.request.dto.js.map