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
exports.RegisterProviderUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const provider_repository_1 = require("../domain/provider.repository");
let RegisterProviderUseCase = class RegisterProviderUseCase {
    providers;
    audit;
    constructor(providers, audit) {
        this.providers = providers;
        this.audit = audit;
    }
    async execute(input, actorId, tenantId) {
        if (input.taxId) {
            const existing = await this.providers.findByTaxId(input.taxId);
            if (existing) {
                throw new domain_exception_1.ConflictError('TAX_ID_TAKEN', `Ya existe un proveedor con el CUIT/RUT ${input.taxId}`);
            }
        }
        const provider = await this.providers.create({ ...input, tenantId });
        await this.audit.write({
            actorId,
            action: 'CREATE',
            entityType: 'Provider',
            entityId: provider.id,
            payload: { name: provider.name, serviceType: provider.serviceType },
            tenantId,
        });
        return provider;
    }
};
exports.RegisterProviderUseCase = RegisterProviderUseCase;
exports.RegisterProviderUseCase = RegisterProviderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(provider_repository_1.PROVIDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], RegisterProviderUseCase);
//# sourceMappingURL=register-provider.use-case.js.map