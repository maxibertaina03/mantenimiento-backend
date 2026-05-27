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
const provider_repository_1 = require("../domain/provider.repository");
let ListProvidersUseCase = class ListProvidersUseCase {
    providers;
    constructor(providers) {
        this.providers = providers;
    }
    async execute(input) {
        const page = Math.max(1, input.page ?? 1);
        const pageSize = Math.min(100, Math.max(1, input.pageSize ?? 20));
        const { items, total } = await this.providers.list({
            skip: (page - 1) * pageSize,
            take: pageSize,
            search: input.search?.trim() || undefined,
            serviceType: input.serviceType,
            active: input.active,
        });
        return { items, total, page, pageSize };
    }
};
exports.ListProvidersUseCase = ListProvidersUseCase;
exports.ListProvidersUseCase = ListProvidersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(provider_repository_1.PROVIDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListProvidersUseCase);
//# sourceMappingURL=list-providers.use-case.js.map