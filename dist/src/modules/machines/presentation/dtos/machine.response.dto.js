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
exports.MachineResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const machine_status_vo_1 = require("../../domain/value-objects/machine-status.vo");
const library_1 = require("@prisma/client/runtime/library");
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
    createdAt;
    updatedAt;
}
exports.MachineResponseDto = MachineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único de la máquina', format: 'uuid' }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código único de la máquina', example: 'MAQ-001' }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la máquina', example: 'Torno CNC' }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marca de la máquina', nullable: true, example: 'Haas' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Modelo de la máquina', nullable: true, example: 'VF-4' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de serie', nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado actual', enum: ['ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE'] }),
    __metadata("design:type", String)
], MachineResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horas de uso acumuladas', type: 'number' }),
    __metadata("design:type", library_1.Decimal)
], MachineResponseDto.prototype, "usageHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ubicación de la máquina', nullable: true, example: 'Taller A' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del responsable', nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "responsibleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notas adicionales', nullable: true }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Intervalo de mantenimiento preventivo en horas', nullable: true, type: 'number' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "preventiveIntervalHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horas en las que se realizó el último mantenimiento preventivo', nullable: true, type: 'number' }),
    __metadata("design:type", Object)
], MachineResponseDto.prototype, "lastPreventiveAtHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', format: 'date-time' }),
    __metadata("design:type", Date)
], MachineResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Última actualización', format: 'date-time' }),
    __metadata("design:type", Date)
], MachineResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=machine.response.dto.js.map