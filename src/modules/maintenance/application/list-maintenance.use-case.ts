import { Inject, Injectable } from '@nestjs/common';
import {
  MAINTENANCE_REPOSITORY,
  type MaintenanceRepository,
} from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { ListMaintenanceInput } from './dto/maintenance-input';

export interface PaginatedMaintenance {
  items: MaintenanceOrder[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListMaintenanceUseCase {
  constructor(
    @Inject(MAINTENANCE_REPOSITORY) private readonly orders: MaintenanceRepository,
  ) {}

  async execute(input: ListMaintenanceInput): Promise<PaginatedMaintenance> {
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
}
