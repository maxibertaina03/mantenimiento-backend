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
exports.UpdateMaintenanceUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const maintenance_repository_1 = require("../domain/maintenance.repository");
let UpdateMaintenanceUseCase = class UpdateMaintenanceUseCase {
    orders;
    audit;
    constructor(orders, audit) {
        this.orders = orders;
        this.audit = audit;
    }
    async execute(id, input, actorId, tenantId) {
        const order = await this.orders.findById(id);
        if (!order)
            throw new domain_exception_1.NotFoundError('MaintenanceOrder', id);
        order.updateMetadata({
            location: input.location,
            externalLocation: input.externalLocation,
            scheduledFor: input.scheduledFor === undefined ? undefined : (input.scheduledFor ? new Date(input.scheduledFor) : null),
            technicianId: input.technicianId,
            providerId: input.providerId,
            description: input.description,
            observations: input.observations,
        });
        const saved = await this.orders.save(order);
        await this.audit.write({
            actorId,
            action: 'UPDATE',
            entityType: 'MaintenanceOrder',
            entityId: saved.id,
            payload: input,
            tenantId,
        });
        return saved;
    }
};
exports.UpdateMaintenanceUseCase = UpdateMaintenanceUseCase;
exports.UpdateMaintenanceUseCase = UpdateMaintenanceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(maintenance_repository_1.MAINTENANCE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], UpdateMaintenanceUseCase);
//# sourceMappingURL=update-maintenance.use-case.js.map