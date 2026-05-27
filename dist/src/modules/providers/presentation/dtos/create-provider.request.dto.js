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
exports.CreateProviderRequestDto = void 0;
const class_validator_1 = require("class-validator");
const provider_service_type_vo_1 = require("../../domain/value-objects/provider-service-type.vo");
class CreateProviderRequestDto {
    name;
    taxId;
    contactName;
    phone;
    email;
    address;
    serviceType;
    notes;
}
exports.CreateProviderRequestDto = CreateProviderRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Provider name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Provider name cannot exceed 255 characters' }),
    __metadata("design:type", String)
], CreateProviderRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProviderRequestDto.prototype, "taxId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProviderRequestDto.prototype, "contactName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProviderRequestDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProviderRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProviderRequestDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(provider_service_type_vo_1.ProviderServiceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProviderRequestDto.prototype, "serviceType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProviderRequestDto.prototype, "notes", void 0);
//# sourceMappingURL=create-provider.request.dto.js.map