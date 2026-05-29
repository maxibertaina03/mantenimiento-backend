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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProviderUseCase = exports.UpdateProviderInput = void 0;
const common_1 = require("@nestjs/common");
const provider_repository_1 = require("../../../domain/repositories/provider.repository");
const provider_not_found_exception_1 = require("../../../domain/exceptions/provider-not-found.exception");
const provider_app_mapper_1 = require("../../mappers/provider-app.mapper");
class UpdateProviderInput {
    id;
    name;
    contactName;
    phone;
    email;
    address;
}
exports.UpdateProviderInput = UpdateProviderInput;
let UpdateProviderUseCase = class UpdateProviderUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const provider = await this.repository.findById(input.id);
        if (!provider)
            throw new provider_not_found_exception_1.ProviderNotFoundException(input.id);
        if (input.name)
            provider.changeName(input.name);
        if (input.contactName !== undefined || input.phone !== undefined || input.email !== undefined || input.address !== undefined) {
            provider.updateContactInfo(input.contactName, input.phone, input.email, input.address);
        }
        await this.repository.save(provider);
        return provider_app_mapper_1.ProviderAppMapper.toOutput(provider);
    }
};
exports.UpdateProviderUseCase = UpdateProviderUseCase;
exports.UpdateProviderUseCase = UpdateProviderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(provider_repository_1.PROVIDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateProviderUseCase);
//# sourceMappingURL=update-provider.use-case.js.map