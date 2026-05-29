import { Injectable, Inject } from '@nestjs/common';
import { IMaintenanceOrderRepository, MAINTENANCE_ORDER_REPOSITORY } from '../../../domain/repositories/maintenance-order.repository';
import { ListMaintenanceOrdersInput } from '../../dtos/list-maintenance-orders.input';
import { ListMaintenanceOrdersOutput, MaintenanceOrderListItemDto } from '../../dtos/list-maintenance-orders.output';

@Injectable()
export class ListMaintenanceOrdersUseCase {
  constructor(
    @Inject(MAINTENANCE_ORDER_REPOSITORY)
    private readonly repository: IMaintenanceOrderRepository,
  ) {}

  async execute(input: ListMaintenanceOrdersInput): Promise<ListMaintenanceOrdersOutput> {
    const orders = await this.repository.findAll(input.tenantId);

    const start = ((input.page ?? 1) - 1) * (input.pageSize ?? 10);
    const end = start + (input.pageSize ?? 10);
    const paginatedOrders = orders.slice(start, end);

    const items: MaintenanceOrderListItemDto[] = paginatedOrders.map((o) => ({
      id: o.getId(),
      machineId: o.getMachineId(),
      type: o.getType(),
      status: o.getStatus(),
      location: o.getLocation(),
      scheduledFor: o.getScheduledFor(),
      startedAt: o.getStartedAt(),
      createdAt: o.getCreatedAt(),
    }));

    return {
      items,
      total: orders.length,
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 10,
    };
  }
}
