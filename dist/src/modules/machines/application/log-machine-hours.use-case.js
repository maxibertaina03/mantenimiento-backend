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
exports.LogMachineHoursUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const machine_repository_1 = require("../domain/machine.repository");
let LogMachineHoursUseCase = class LogMachineHoursUseCase {
    machines;
    audit;
    constructor(machines, audit) {
        this.machines = machines;
        this.audit = audit;
    }
    async execute(id, input, actorId, tenantId) {
        const machine = await this.machines.findById(id);
        if (!machine)
            throw new domain_exception_1.NotFoundError('Machine', id);
        const { hoursBefore, hoursAfter, delta } = machine.logUsageHours({
            hoursAfter: input.hoursAfter,
        });
        const log = await this.machines.logUsageAndSave(machine, {
            hoursBefore,
            hoursAfter,
            delta,
            notes: input.notes ?? null,
            createdById: actorId,
        });
        await this.audit.write({
            actorId,
            action: 'UPDATE',
            entityType: 'Machine',
            entityId: machine.id,
            payload: {
                kind: 'USAGE_LOG',
                hoursBefore: hoursBefore.toString(),
                hoursAfter: hoursAfter.toString(),
                delta: delta.toString(),
                preventiveDue: machine.isPreventiveDue(),
            },
            tenantId,
        });
        return { machine, log };
    }
};
exports.LogMachineHoursUseCase = LogMachineHoursUseCase;
exports.LogMachineHoursUseCase = LogMachineHoursUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(machine_repository_1.MACHINE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], LogMachineHoursUseCase);
//# sourceMappingURL=log-machine-hours.use-case.js.map