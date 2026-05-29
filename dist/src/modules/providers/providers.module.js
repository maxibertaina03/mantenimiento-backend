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
const providers_controller_1 = require("./presentation/controllers/providers.controller");
const create_provider_use_case_1 = require("./application/use-cases/create-provider/create-provider.use-case");
const list_providers_use_case_1 = require("./application/use-cases/list-providers/list-providers.use-case");
const get_provider_use_case_1 = require("./application/use-cases/get-provider/get-provider.use-case");
const update_provider_use_case_1 = require("./application/use-cases/update-provider/update-provider.use-case");
const delete_provider_use_case_1 = require("./application/use-cases/delete-provider/delete-provider.use-case");
const prisma_provider_repository_1 = require("./infrastructure/repositories/prisma-provider.repository");
const provider_repository_1 = require("./domain/repositories/provider.repository");
const prisma_module_1 = require("../../infrastructure/prisma/prisma.module");
let ProvidersModule = class ProvidersModule {
};
exports.ProvidersModule = ProvidersModule;
exports.ProvidersModule = ProvidersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [providers_controller_1.ProvidersController],
        providers: [
            create_provider_use_case_1.CreateProviderUseCase,
            list_providers_use_case_1.ListProvidersUseCase,
            get_provider_use_case_1.GetProviderUseCase,
            update_provider_use_case_1.UpdateProviderUseCase,
            delete_provider_use_case_1.DeleteProviderUseCase,
            {
                provide: provider_repository_1.PROVIDER_REPOSITORY,
                useClass: prisma_provider_repository_1.PrismaProviderRepository,
            },
        ],
        exports: [create_provider_use_case_1.CreateProviderUseCase, list_providers_use_case_1.ListProvidersUseCase, get_provider_use_case_1.GetProviderUseCase, update_provider_use_case_1.UpdateProviderUseCase, delete_provider_use_case_1.DeleteProviderUseCase],
    })
], ProvidersModule);
//# sourceMappingURL=providers.module.js.map