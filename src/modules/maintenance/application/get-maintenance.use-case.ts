import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import {
  MAINTENANCE_REPOSITORY,
  type MaintenanceRepository,
} from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';

@Injectable()
export class GetMaintenanceUseCase {
  constructor(
    @Inject(MAINTENANCE_REPOSITORY) private readonly orders: MaintenanceRepository,
  ) {}

  async execute(id: string): Promise<MaintenanceOrder> {
    const order = await this.orders.findById(id);
    if (!order) throw new NotFoundError('MaintenanceOrder', id);
    return order;
  }
}
