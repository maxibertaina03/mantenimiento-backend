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
exports.RegisterMovementUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const material_repository_1 = require("../domain/material.repository");
let RegisterMovementUseCase = class RegisterMovementUseCase {
    materials;
    audit;
    constructor(materials, audit) {
        this.materials = materials;
        this.audit = audit;
    }
    async execute(materialId, input, actorId, tenantId) {
        const material = await this.materials.findById(materialId);
        if (!material)
            throw new domain_exception_1.NotFoundError('Material', materialId);
        const applied = input.type === 'ADJUSTMENT'
            ? material.applyAdjustment(input.quantity, input.adjustmentSign ?? 1, input.reason ?? null)
            : material.applyMovement({
                type: input.type,
                quantity: input.quantity,
                reason: input.reason,
                reference: input.reference,
            });
        if (input.type === 'ADJUSTMENT' && input.adjustmentSign === undefined) {
            throw new domain_exception_1.ValidationError('ADJUSTMENT_SIGN_REQUIRED', 'Para ajustes hay que indicar el signo (1 = suma, -1 = resta)');
        }
        const movement = await this.materials.persistMovement(material, {
            materialId,
            applied,
            reason: input.reason ?? null,
            reference: input.reference ?? null,
            createdById: actorId,
            tenantId,
        });
        await this.audit.write({
            actorId,
            action: 'STOCK_MOVEMENT',
            entityType: 'Material',
            entityId: materialId,
            payload: {
                type: applied.type,
                quantity: applied.quantity.toString(),
                delta: applied.delta.toString(),
                stockBefore: applied.stockBefore.toString(),
                stockAfter: applied.stockAfter.toString(),
                reason: input.reason,
                reference: input.reference,
            },
            tenantId,
        });
        return { material, movement };
    }
};
exports.RegisterMovementUseCase = RegisterMovementUseCase;
exports.RegisterMovementUseCase = RegisterMovementUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(material_repository_1.MATERIAL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], RegisterMovementUseCase);
//# sourceMappingURL=register-movement.use-case.js.map