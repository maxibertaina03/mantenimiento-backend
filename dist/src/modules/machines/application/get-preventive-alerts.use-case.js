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
exports.GetPreventiveAlertsUseCase = void 0;
const common_1 = require("@nestjs/common");
const machine_repository_1 = require("../domain/machine.repository");
let GetPreventiveAlertsUseCase = class GetPreventiveAlertsUseCase {
    machines;
    constructor(machines) {
        this.machines = machines;
    }
    async execute(tenantId) {
        const due = await this.machines.findPreventiveDue(tenantId);
        return due
            .filter((m) => m.isPreventiveDue())
            .map((machine) => {
            const remaining = machine.hoursUntilPreventive();
            const overdueBy = remaining ? remaining.negated().toString() : '0';
            return { machine, overdueByHours: overdueBy };
        });
    }
};
exports.GetPreventiveAlertsUseCase = GetPreventiveAlertsUseCase;
exports.GetPreventiveAlertsUseCase = GetPreventiveAlertsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(machine_repository_1.MACHINE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetPreventiveAlertsUseCase);
//# sourceMappingURL=get-preventive-alerts.use-case.js.map