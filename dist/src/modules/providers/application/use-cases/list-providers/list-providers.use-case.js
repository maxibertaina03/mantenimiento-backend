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
exports.ListProvidersUseCase = void 0;
const common_1 = require("@nestjs/common");
const provider_repository_1 = require("../../../domain/repositories/provider.repository");
let ListProvidersUseCase = class ListProvidersUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const providers = await this.repository.findAll(input.tenantId);
        const start = ((input.page ?? 1) - 1) * (input.pageSize ?? 10);
        const end = start + (input.pageSize ?? 10);
        const paginatedProviders = providers.slice(start, end);
        const items = paginatedProviders.map((p) => ({
            id: p.getId(),
            name: p.getName(),
            contactName: p.getContactName(),
            phone: p.getPhone(),
            email: p.getEmail(),
            serviceType: p.getServiceType(),
            active: p.isActive(),
            createdAt: p.getCreatedAt(),
        }));
        return {
            items,
            total: providers.length,
            page: input.page ?? 1,
            pageSize: input.pageSize ?? 10,
        };
    }
};
exports.ListProvidersUseCase = ListProvidersUseCase;
exports.ListProvidersUseCase = ListProvidersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(provider_repository_1.PROVIDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListProvidersUseCase);
//# sourceMappingURL=list-providers.use-case.js.map