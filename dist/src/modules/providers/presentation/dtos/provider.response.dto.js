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
exports.ProviderResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const provider_service_type_vo_1 = require("../../domain/value-objects/provider-service-type.vo");
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
    createdAt;
    updatedAt;
}
exports.ProviderResponseDto = ProviderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único del proveedor', format: 'uuid' }),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del proveedor', example: 'Proveedores Industriales S.A.' }),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID fiscal/RUT', nullable: true, example: '12.345.678-9' }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del contacto', nullable: true, example: 'Juan García' }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "contactName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teléfono', nullable: true, example: '+56 2 2345 6789' }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Correo electrónico', nullable: true, example: 'contacto@proveedor.cl' }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dirección', nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de servicio', enum: Object.values(provider_service_type_vo_1.ProviderServiceType) }),
    __metadata("design:type", String)
], ProviderResponseDto.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notas adicionales', nullable: true }),
    __metadata("design:type", Object)
], ProviderResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado activo del proveedor', type: 'boolean' }),
    __metadata("design:type", Boolean)
], ProviderResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', format: 'date-time' }),
    __metadata("design:type", Date)
], ProviderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Última actualización', format: 'date-time' }),
    __metadata("design:type", Date)
], ProviderResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=provider.response.dto.js.map