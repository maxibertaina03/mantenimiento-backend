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
exports.MachinePublicService = void 0;
const common_1 = require("@nestjs/common");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const machine_repository_1 = require("../domain/machine.repository");
let MachinePublicService = class MachinePublicService {
    machines;
    constructor(machines) {
        this.machines = machines;
    }
    async requireById(id) {
        const m = await this.machines.findById(id);
        if (!m)
            throw new domain_exception_1.NotFoundError('Machine', id);
        return m;
    }
    async markPreventiveCompleted(machineId, atHours) {
        const m = await this.requireById(machineId);
        m.markPreventiveCompleted(atHours);
        await this.machines.save(m);
    }
    async setStatusFromMaintenance(machineId, status) {
        const m = await this.requireById(machineId);
        if (m.status !== status) {
            m.changeStatus(status);
            await this.machines.save(m);
        }
    }
};
exports.MachinePublicService = MachinePublicService;
exports.MachinePublicService = MachinePublicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(machine_repository_1.MACHINE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], MachinePublicService);
//# sourceMappingURL=machine-public.service.js.map