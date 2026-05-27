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
exports.CompleteMaintenanceUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const machine_public_service_1 = require("../../machines/application/machine-public.service");
const maintenance_repository_1 = require("../domain/maintenance.repository");
let CompleteMaintenanceUseCase = class CompleteMaintenanceUseCase {
    orders;
    machines;
    audit;
    constructor(orders, machines, audit) {
        this.orders = orders;
        this.machines = machines;
        this.audit = audit;
    }
    async execute(id, input, actorId, tenantId) {
        const order = await this.orders.findById(id);
        if (!order)
            throw new domain_exception_1.NotFoundError('MaintenanceOrder', id);
        const { from, to, hoursSnapshot } = order.complete(input);
        const saved = await this.orders.save(order);
        if (saved.type === 'PREVENTIVE') {
            await this.machines.markPreventiveCompleted(saved.machineId, hoursSnapshot.toString());
        }
        const machineNext = saved.derivedMachineStatus();
        if (machineNext) {
            await this.machines.setStatusFromMaintenance(saved.machineId, machineNext);
        }
        await this.audit.write({
            actorId,
            action: 'STATE_CHANGE',
            entityType: 'MaintenanceOrder',
            entityId: saved.id,
            payload: {
                from,
                to,
                machineHoursSnapshot: hoursSnapshot.toString(),
                cost: saved.cost?.toString() ?? null,
                type: saved.type,
            },
            tenantId,
        });
        return saved;
    }
};
exports.CompleteMaintenanceUseCase = CompleteMaintenanceUseCase;
exports.CompleteMaintenanceUseCase = CompleteMaintenanceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(maintenance_repository_1.MAINTENANCE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, machine_public_service_1.MachinePublicService,
        audit_writer_1.AuditWriter])
], CompleteMaintenanceUseCase);
//# sourceMappingURL=complete-maintenance.use-case.js.map