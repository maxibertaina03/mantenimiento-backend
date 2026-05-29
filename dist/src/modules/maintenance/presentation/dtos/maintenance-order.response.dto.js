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
exports.MaintenanceOrderResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const maintenance_status_vo_1 = require("../../domain/value-objects/maintenance-status.vo");
const maintenance_type_vo_1 = require("../../domain/value-objects/maintenance-type.vo");
const maintenance_location_vo_1 = require("../../domain/value-objects/maintenance-location.vo");
class MaintenanceOrderResponseDto {
    id;
    machineId;
    type;
    status;
    location;
    cost;
    createdAt;
    updatedAt;
}
exports.MaintenanceOrderResponseDto = MaintenanceOrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único de la orden de mantenimiento', format: 'uuid' }),
    __metadata("design:type", String)
], MaintenanceOrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la máquina', format: 'uuid' }),
    __metadata("design:type", String)
], MaintenanceOrderResponseDto.prototype, "machineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de mantenimiento', enum: Object.values(maintenance_type_vo_1.MaintenanceType) }),
    __metadata("design:type", String)
], MaintenanceOrderResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado actual de la orden', enum: Object.values(maintenance_status_vo_1.MaintenanceStatus) }),
    __metadata("design:type", String)
], MaintenanceOrderResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ubicación del mantenimiento', enum: Object.values(maintenance_location_vo_1.MaintenanceLocation) }),
    __metadata("design:type", String)
], MaintenanceOrderResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo del mantenimiento', nullable: true, type: 'number' }),
    __metadata("design:type", Object)
], MaintenanceOrderResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', format: 'date-time' }),
    __metadata("design:type", Date)
], MaintenanceOrderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Última actualización', format: 'date-time' }),
    __metadata("design:type", Date)
], MaintenanceOrderResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=maintenance-order.response.dto.js.map