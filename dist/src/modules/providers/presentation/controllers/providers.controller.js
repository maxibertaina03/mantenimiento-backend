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
exports.ProvidersController = void 0;
const common_1 = require("@nestjs/common");
const create_provider_use_case_1 = require("../../application/use-cases/create-provider/create-provider.use-case");
const create_provider_request_dto_1 = require("../dtos/create-provider.request.dto");
const create_provider_validation_pipe_1 = require("../pipes/create-provider-validation.pipe");
const provider_presenter_mapper_1 = require("../mappers/provider-presenter.mapper");
const clerk_auth_guard_1 = require("../../../../common/guards/clerk-auth.guard");
let ProvidersController = class ProvidersController {
    createProvider;
    constructor(createProvider) {
        this.createProvider = createProvider;
    }
    async create(dto) {
        const output = await this.createProvider.execute({
            name: dto.name,
            taxId: dto.taxId ?? null,
            contactName: dto.contactName ?? null,
            phone: dto.phone ?? null,
            email: dto.email ?? null,
            address: dto.address ?? null,
            serviceType: dto.serviceType,
            notes: dto.notes ?? null,
        });
        return provider_presenter_mapper_1.ProviderPresenterMapper.toResponse(output);
    }
};
exports.ProvidersController = ProvidersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(create_provider_validation_pipe_1.CreateProviderValidationPipe, new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_provider_request_dto_1.CreateProviderRequestDto]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "create", null);
exports.ProvidersController = ProvidersController = __decorate([
    (0, common_1.Controller)('providers'),
    (0, common_1.UseGuards)(clerk_auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [create_provider_use_case_1.CreateProviderUseCase])
], ProvidersController);
//# sourceMappingURL=providers.controller.js.map