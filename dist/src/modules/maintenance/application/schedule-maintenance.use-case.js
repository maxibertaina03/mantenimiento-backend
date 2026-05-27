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
exports.ScheduleMaintenanceUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const machine_public_service_1 = require("../../machines/application/machine-public.service");
const maintenance_repository_1 = require("../domain/maintenance.repository");
let ScheduleMaintenanceUseCase = class ScheduleMaintenanceUseCase {
    orders;
    machines;
    audit;
    constructor(orders, machines, audit) {
        this.orders = orders;
        this.machines = machines;
        this.audit = audit;
    }
    async execute(input, actorId, tenantId) {
        if (input.location === 'EXTERNAL' && !input.providerId) {
            throw new domain_exception_1.ValidationError('PROVIDER_REQUIRED', 'El mantenimiento externo requiere un proveedor');
        }
        await this.machines.requireById(input.machineId);
        const order = await this.orders.create({
            machineId: input.machineId,
            type: input.type,
            location: input.location,
            externalLocation: input.externalLocation ?? null,
            scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : null,
            technicianId: input.technicianId ?? null,
            providerId: input.providerId ?? null,
            description: input.description ?? null,
            tenantId,
        });
        await this.audit.write({
            actorId,
            action: 'CREATE',
            entityType: 'MaintenanceOrder',
            entityId: order.id,
            payload: { machineId: order.machineId, type: order.type, location: order.location },
            tenantId,
        });
        return order;
    }
};
exports.ScheduleMaintenanceUseCase = ScheduleMaintenanceUseCase;
exports.ScheduleMaintenanceUseCase = ScheduleMaintenanceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(maintenance_repository_1.MAINTENANCE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, machine_public_service_1.MachinePublicService,
        audit_writer_1.AuditWriter])
], ScheduleMaintenanceUseCase);
//# sourceMappingURL=schedule-maintenance.use-case.js.map