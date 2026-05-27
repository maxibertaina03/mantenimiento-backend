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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardStatsUseCase = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
let GetDashboardStatsUseCase = class GetDashboardStatsUseCase {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(tenantId) {
        const tenantFilter = tenantId !== undefined && tenantId !== null ? { tenantId } : {};
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const [machinesTotal, machinesOperational, machinesInternalMx, machinesExternalMx, machinesOOS, preventiveDueRows, mxScheduled, mxInProgress, mxCompleted30d, toolsTotal, toolsAvailable, toolsOnLoan, toolsInRepair, materialsTotal, lowStockRows,] = await this.prisma.$transaction([
            this.prisma.machine.count({ where: { deletedAt: null, ...tenantFilter } }),
            this.prisma.machine.count({
                where: { deletedAt: null, status: 'OPERATIONAL', ...tenantFilter },
            }),
            this.prisma.machine.count({
                where: { deletedAt: null, status: 'INTERNAL_MAINTENANCE', ...tenantFilter },
            }),
            this.prisma.machine.count({
                where: { deletedAt: null, status: 'EXTERNAL_MAINTENANCE', ...tenantFilter },
            }),
            this.prisma.machine.count({
                where: { deletedAt: null, status: 'OUT_OF_SERVICE', ...tenantFilter },
            }),
            this.prisma.$queryRaw `
        SELECT COUNT(*)::bigint AS count FROM machines
        WHERE deleted_at IS NULL
          AND preventive_interval_hours IS NOT NULL
          AND (usage_hours - COALESCE(last_preventive_at_hours, 0)) >= preventive_interval_hours
      `,
            this.prisma.maintenanceOrder.count({
                where: { deletedAt: null, status: 'SCHEDULED', ...tenantFilter },
            }),
            this.prisma.maintenanceOrder.count({
                where: { deletedAt: null, status: 'IN_PROGRESS', ...tenantFilter },
            }),
            this.prisma.maintenanceOrder.count({
                where: {
                    deletedAt: null,
                    status: 'COMPLETED',
                    completedAt: { gte: thirtyDaysAgo },
                    ...tenantFilter,
                },
            }),
            this.prisma.tool.count({ where: { deletedAt: null, ...tenantFilter } }),
            this.prisma.tool.count({
                where: { deletedAt: null, status: 'AVAILABLE', ...tenantFilter },
            }),
            this.prisma.tool.count({
                where: { deletedAt: null, status: 'ON_LOAN', ...tenantFilter },
            }),
            this.prisma.tool.count({
                where: { deletedAt: null, status: 'IN_REPAIR', ...tenantFilter },
            }),
            this.prisma.material.count({ where: { deletedAt: null, ...tenantFilter } }),
            this.prisma.$queryRaw `
        SELECT COUNT(*)::bigint AS count FROM materials
        WHERE deleted_at IS NULL
          AND min_stock > 0
          AND stock < min_stock
      `,
        ]);
        return {
            machines: {
                total: machinesTotal,
                operational: machinesOperational,
                inMaintenance: machinesInternalMx + machinesExternalMx,
                outOfService: machinesOOS,
                preventiveDue: Number(preventiveDueRows[0]?.count ?? 0),
            },
            maintenance: {
                pending: mxScheduled + mxInProgress,
                scheduled: mxScheduled,
                inProgress: mxInProgress,
                completedLast30d: mxCompleted30d,
            },
            tools: {
                total: toolsTotal,
                available: toolsAvailable,
                onLoan: toolsOnLoan,
                inRepair: toolsInRepair,
            },
            materials: {
                total: materialsTotal,
                lowStock: Number(lowStockRows[0]?.count ?? 0),
            },
        };
    }
};
exports.GetDashboardStatsUseCase = GetDashboardStatsUseCase;
exports.GetDashboardStatsUseCase = GetDashboardStatsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetDashboardStatsUseCase);
//# sourceMappingURL=get-dashboard-stats.use-case.js.map