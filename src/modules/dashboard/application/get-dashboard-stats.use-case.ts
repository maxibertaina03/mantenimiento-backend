import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

export interface DashboardStats {
  machines: {
    total: number;
    operational: number;
    inMaintenance: number;
    outOfService: number;
    preventiveDue: number;
  };
  maintenance: {
    pending: number;
    scheduled: number;
    inProgress: number;
    completedLast30d: number;
  };
  tools: {
    total: number;
    available: number;
    onLoan: number;
    inRepair: number;
  };
  materials: {
    total: number;
    lowStock: number;
  };
}

/**
 * Read model agregado para el dashboard. Va directo a Prisma con counts
 * paralelos para mantener el SLA del endpoint bajo. No necesita pasar por
 * los repos de cada bounded context (sería el camino correcto a microservicios:
 * publicar eventos a un view store).
 */
@Injectable()
export class GetDashboardStatsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(tenantId: string | null): Promise<DashboardStats> {
    const tenantFilter = tenantId !== undefined && tenantId !== null ? { tenantId } : {};
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      machinesTotal,
      machinesOperational,
      machinesInternalMx,
      machinesExternalMx,
      machinesOOS,
      preventiveDueRows,
      mxScheduled,
      mxInProgress,
      mxCompleted30d,
      toolsTotal,
      toolsAvailable,
      toolsOnLoan,
      toolsInRepair,
      materialsTotal,
      lowStockRows,
    ] = await this.prisma.$transaction([
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
      this.prisma.$queryRaw<{ count: bigint }[]>`
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
      this.prisma.$queryRaw<{ count: bigint }[]>`
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
}
