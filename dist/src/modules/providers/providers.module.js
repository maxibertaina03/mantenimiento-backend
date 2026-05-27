"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidersModule = void 0;
const common_1 = require("@nestjs/common");
const providers_controller_1 = require("./presentation/providers.controller");
const provider_repository_1 = require("./domain/provider.repository");
const prisma_provider_repository_1 = require("./infrastructure/prisma-provider.repository");
const register_provider_use_case_1 = require("./application/register-provider.use-case");
const update_provider_use_case_1 = require("./application/update-provider.use-case");
const toggle_active_provider_use_case_1 = require("./application/toggle-active-provider.use-case");
const list_providers_use_case_1 = require("./application/list-providers.use-case");
const get_provider_use_case_1 = require("./application/get-provider.use-case");
let ProvidersModule = class ProvidersModule {
};
exports.ProvidersModule = ProvidersModule;
exports.ProvidersModule = ProvidersModule = __decorate([
    (0, common_1.Module)({
        controllers: [providers_controller_1.ProvidersController],
        providers: [
            { provide: provider_repository_1.PROVIDER_REPOSITORY, useClass: prisma_provider_repository_1.PrismaProviderRepository },
            register_provider_use_case_1.RegisterProviderUseCase,
            update_provider_use_case_1.UpdateProviderUseCase,
            toggle_active_provider_use_case_1.ToggleActiveProviderUseCase,
            list_providers_use_case_1.ListProvidersUseCase,
            get_provider_use_case_1.GetProviderUseCase,
        ],
    })
], ProvidersModule);
//# sourceMappingURL=providers.module.js.map