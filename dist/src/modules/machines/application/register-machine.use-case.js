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
exports.RegisterMachineUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const machine_repository_1 = require("../domain/machine.repository");
let RegisterMachineUseCase = class RegisterMachineUseCase {
    machines;
    audit;
    constructor(machines, audit) {
        this.machines = machines;
        this.audit = audit;
    }
    async execute(input, actorId, tenantId) {
        const existing = await this.machines.findByCode(input.code);
        if (existing) {
            throw new domain_exception_1.ConflictError('MACHINE_CODE_TAKEN', `El código ${input.code} ya está en uso`);
        }
        const machine = await this.machines.create({
            code: input.code,
            name: input.name,
            brand: input.brand ?? null,
            model: input.model ?? null,
            serialNumber: input.serialNumber ?? null,
            usageHours: input.initialUsageHours ?? '0',
            location: input.location ?? null,
            responsibleId: input.responsibleId ?? null,
            notes: input.notes ?? null,
            preventiveIntervalHours: input.preventiveIntervalHours ?? null,
            tenantId,
        });
        await this.audit.write({
            actorId,
            action: 'CREATE',
            entityType: 'Machine',
            entityId: machine.id,
            payload: { code: machine.code, name: machine.name },
            tenantId,
        });
        return machine;
    }
};
exports.RegisterMachineUseCase = RegisterMachineUseCase;
exports.RegisterMachineUseCase = RegisterMachineUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(machine_repository_1.MACHINE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], RegisterMachineUseCase);
//# sourceMappingURL=register-machine.use-case.js.map