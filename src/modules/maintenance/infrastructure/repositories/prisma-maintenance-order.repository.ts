import { Injectable } from '@nestjs/common';
import type { Prisma, MaintenanceStatus as PrismaMaintenanceStatus, MaintenanceType as PrismaMaintenanceType } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';
import { IMaintenanceOrderRepository, MaintenanceOrderFilters } from '../../domain/repositories/maintenance-order.repository';
import { PrismaMaintenanceOrderMapper } from '../mappers/prisma-maintenance-order.mapper';

@Injectable()
export class PrismaMaintenanceOrderRepository implements IMaintenanceOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: MaintenanceOrder): Promise<void> {
    const data = PrismaMaintenanceOrderMapper.toPersistence(order);
    await this.prisma.maintenanceOrder.upsert({
      where: { id: order.getId() },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<MaintenanceOrder | null> {
    const raw = await this.prisma.maintenanceOrder.findUnique({ where: { id } });
    return raw ? PrismaMaintenanceOrderMapper.toDomain(raw) : null;
  }

  async findByMachineId(machineId: string): Promise<MaintenanceOrder[]> {
    const orders = await this.prisma.maintenanceOrder.findMany({ where: { machineId } });
    return orders.map((raw) => PrismaMaintenanceOrderMapper.toDomain(raw));
  }

  async findAll(filters: MaintenanceOrderFilters = {}): Promise<MaintenanceOrder[]> {
    const where: Prisma.MaintenanceOrderWhereInput = { deletedAt: null };
    if (filters.tenantId) where.tenantId = filters.tenantId;
    if (filters.machineId) where.machineId = filters.machineId;
    if (filters.status) where.status = filters.status as PrismaMaintenanceStatus;
    if (filters.type) where.type = filters.type as PrismaMaintenanceType;
    if (filters.technicianId) where.technicianId = filters.technicianId;
    if (filters.providerId) where.providerId = filters.providerId;
    if (filters.scheduledFrom || filters.scheduledTo) {
      where.scheduledFor = {};
      if (filters.scheduledFrom) where.scheduledFor.gte = filters.scheduledFrom;
      if (filters.scheduledTo) where.scheduledFor.lte = filters.scheduledTo;
    }
    const orders = await this.prisma.maintenanceOrder.findMany({
      where,
      orderBy: [{ scheduledFor: 'desc' }, { createdAt: 'desc' }],
    });
    return orders.map((raw) => PrismaMaintenanceOrderMapper.toDomain(raw));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.maintenanceOrder.delete({ where: { id } });
  }
}
