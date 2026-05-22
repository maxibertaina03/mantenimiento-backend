import { Injectable } from '@nestjs/common';
import { Prisma, type MaintenanceOrder as PrismaMaintenanceOrder } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type {
  CreateMaintenanceProps,
  ListMaintenanceQuery,
  MaintenanceRepository,
} from '../domain/maintenance.repository';

@Injectable()
export class PrismaMaintenanceRepository implements MaintenanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(props: CreateMaintenanceProps): Promise<MaintenanceOrder> {
    const row = await this.prisma.maintenanceOrder.create({
      data: {
        machineId: props.machineId,
        type: props.type,
        location: props.location,
        externalLocation: props.externalLocation ?? null,
        scheduledFor: props.scheduledFor ?? null,
        technicianId: props.technicianId ?? null,
        providerId: props.providerId ?? null,
        description: props.description ?? null,
        tenantId: props.tenantId ?? null,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<MaintenanceOrder | null> {
    const row = await this.prisma.maintenanceOrder.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? this.toDomain(row) : null;
  }

  async list(query: ListMaintenanceQuery): Promise<{ items: MaintenanceOrder[]; total: number }> {
    const where: Prisma.MaintenanceOrderWhereInput = {
      deletedAt: null,
      ...(query.machineId ? { machineId: query.machineId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.type ? { type: query.type } : {}),
      ...(query.technicianId ? { technicianId: query.technicianId } : {}),
      ...(query.providerId ? { providerId: query.providerId } : {}),
      ...(query.scheduledFrom || query.scheduledTo
        ? {
            scheduledFor: {
              ...(query.scheduledFrom ? { gte: query.scheduledFrom } : {}),
              ...(query.scheduledTo ? { lte: query.scheduledTo } : {}),
            },
          }
        : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.maintenanceOrder.findMany({
        where,
        skip: query.skip ?? 0,
        take: query.take ?? 20,
        orderBy: [{ status: 'asc' }, { scheduledFor: 'asc' }, { createdAt: 'desc' }],
      }),
      this.prisma.maintenanceOrder.count({ where }),
    ]);
    return { items: rows.map((r) => this.toDomain(r)), total };
  }

  async save(order: MaintenanceOrder): Promise<MaintenanceOrder> {
    const row = await this.prisma.maintenanceOrder.update({
      where: { id: order.id },
      data: {
        status: order.status,
        location: order.location,
        externalLocation: order.externalLocation,
        scheduledFor: order.scheduledFor,
        startedAt: order.startedAt,
        completedAt: order.completedAt,
        machineHoursSnapshot: order.machineHoursSnapshot?.toString() ?? null,
        technicianId: order.technicianId,
        providerId: order.providerId,
        cost: order.cost?.toString() ?? null,
        currency: order.currency,
        description: order.description,
        observations: order.observations,
      },
    });
    return this.toDomain(row);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.maintenanceOrder.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async countPending(tenantId?: string | null): Promise<number> {
    return this.prisma.maintenanceOrder.count({
      where: {
        deletedAt: null,
        status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
        ...(tenantId !== undefined ? { tenantId } : {}),
      },
    });
  }

  private toDomain(row: PrismaMaintenanceOrder): MaintenanceOrder {
    return MaintenanceOrder.rehydrate({
      id: row.id,
      machineId: row.machineId,
      type: row.type,
      status: row.status,
      location: row.location,
      externalLocation: row.externalLocation,
      scheduledFor: row.scheduledFor,
      startedAt: row.startedAt,
      completedAt: row.completedAt,
      machineHoursSnapshot: row.machineHoursSnapshot,
      technicianId: row.technicianId,
      providerId: row.providerId,
      cost: row.cost,
      currency: row.currency,
      description: row.description,
      observations: row.observations,
      tenantId: row.tenantId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
