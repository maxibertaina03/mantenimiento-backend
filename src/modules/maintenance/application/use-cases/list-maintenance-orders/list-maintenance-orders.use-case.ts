import { Injectable, Inject } from '@nestjs/common';
import { IMaintenanceOrderRepository, MAINTENANCE_ORDER_REPOSITORY } from '../../../domain/repositories/maintenance-order.repository';
import { MaintenanceOrderAppMapper } from '../../mappers/maintenance-order-app.mapper';
import { ListMaintenanceOrdersInput } from '../../dtos/list-maintenance-orders.input';
import type { CreateMaintenanceOrderOutput } from '../../dtos/create-maintenance-order.output';

export interface ListMaintenanceOrdersOutput {
  items: CreateMaintenanceOrderOutput[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListMaintenanceOrdersUseCase {
  constructor(
    @Inject(MAINTENANCE_ORDER_REPOSITORY)
    private readonly repository: IMaintenanceOrderRepository,
  ) {}

  async execute(input: ListMaintenanceOrdersInput): Promise<ListMaintenanceOrdersOutput> {
    const orders = await this.repository.findAll({
      tenantId: input.tenantId,
      machineId: input.machineId,
      status: input.status,
      type: input.type,
      technicianId: input.technicianId,
      providerId: input.providerId,
      scheduledFrom: input.scheduledFrom,
      scheduledTo: input.scheduledTo,
    });

    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedOrders = orders.slice(start, end);

    const items = paginatedOrders.map((o) => MaintenanceOrderAppMapper.toOutput(o));

    return {
      items,
      total: orders.length,
      page,
      pageSize,
    };
  }
}
