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
exports.CreateMaintenanceOrderRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const maintenance_type_vo_1 = require("../../domain/value-objects/maintenance-type.vo");
const maintenance_location_vo_1 = require("../../domain/value-objects/maintenance-location.vo");
class CreateMaintenanceOrderRequestDto {
    machineId;
    type;
    location;
    externalLocation;
    scheduledFor;
    technicianId;
    providerId;
    cost;
    currency;
    description;
    observations;
}
exports.CreateMaintenanceOrderRequestDto = CreateMaintenanceOrderRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la máquina a mantener', format: 'uuid' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaintenanceOrderRequestDto.prototype, "machineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de mantenimiento', enum: Object.values(maintenance_type_vo_1.MaintenanceType) }),
    (0, class_validator_1.IsEnum)(maintenance_type_vo_1.MaintenanceType),
    __metadata("design:type", String)
], CreateMaintenanceOrderRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ubicación del mantenimiento', enum: Object.values(maintenance_location_vo_1.MaintenanceLocation), required: false }),
    (0, class_validator_1.IsEnum)(maintenance_location_vo_1.MaintenanceLocation),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMaintenanceOrderRequestDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ubicación externa (si aplica)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaintenanceOrderRequestDto.prototype, "externalLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha programada para el mantenimiento', format: 'date-time', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaintenanceOrderRequestDto.prototype, "scheduledFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del técnico responsable', format: 'uuid', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaintenanceOrderRequestDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del proveedor (si es mantenimiento externo)', format: 'uuid', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaintenanceOrderRequestDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo del mantenimiento', required: false, example: 500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Object)
], CreateMaintenanceOrderRequestDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Moneda del costo', required: false, example: 'USD', default: 'USD' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMaintenanceOrderRequestDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción del mantenimiento', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaintenanceOrderRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observaciones adicionales', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaintenanceOrderRequestDto.prototype, "observations", void 0);
//# sourceMappingURL=create-maintenance-order.request.dto.js.map