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
exports.ListMaintenanceUseCase = void 0;
const common_1 = require("@nestjs/common");
const maintenance_repository_1 = require("../domain/maintenance.repository");
let ListMaintenanceUseCase = class ListMaintenanceUseCase {
    orders;
    constructor(orders) {
        this.orders = orders;
    }
    async execute(input) {
        const page = Math.max(1, input.page ?? 1);
        const pageSize = Math.min(100, Math.max(1, input.pageSize ?? 20));
        const { items, total } = await this.orders.list({
            skip: (page - 1) * pageSize,
            take: pageSize,
            machineId: input.machineId,
            status: input.status,
            type: input.type,
            technicianId: input.technicianId,
            providerId: input.providerId,
            scheduledFrom: input.scheduledFrom ? new Date(input.scheduledFrom) : undefined,
            scheduledTo: input.scheduledTo ? new Date(input.scheduledTo) : undefined,
        });
        return { items, total, page, pageSize };
    }
};
exports.ListMaintenanceUseCase = ListMaintenanceUseCase;
exports.ListMaintenanceUseCase = ListMaintenanceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(maintenance_repository_1.MAINTENANCE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListMaintenanceUseCase);
//# sourceMappingURL=list-maintenance.use-case.js.map