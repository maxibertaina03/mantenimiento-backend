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
exports.GetProviderUseCase = void 0;
const common_1 = require("@nestjs/common");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const provider_repository_1 = require("../domain/provider.repository");
let GetProviderUseCase = class GetProviderUseCase {
    providers;
    constructor(providers) {
        this.providers = providers;
    }
    async execute(id) {
        const p = await this.providers.findById(id);
        if (!p)
            throw new domain_exception_1.NotFoundError('Provider', id);
        return p;
    }
};
exports.GetProviderUseCase = GetProviderUseCase;
exports.GetProviderUseCase = GetProviderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(provider_repository_1.PROVIDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetProviderUseCase);
//# sourceMappingURL=get-provider.use-case.js.map