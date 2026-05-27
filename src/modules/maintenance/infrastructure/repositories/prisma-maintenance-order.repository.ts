import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';
import { IMaintenanceOrderRepository } from '../../domain/repositories/maintenance-order.repository';
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

  async findAll(tenantId?: string | null): Promise<MaintenanceOrder[]> {
    const orders = await this.prisma.maintenanceOrder.findMany({
      where: tenantId ? { tenantId } : {},
    });
    return orders.map((raw) => PrismaMaintenanceOrderMapper.toDomain(raw));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.maintenanceOrder.delete({ where: { id } });
  }
}
