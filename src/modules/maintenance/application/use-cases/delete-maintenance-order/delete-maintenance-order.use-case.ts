import { Injectable, Inject } from '@nestjs/common';
import { IMaintenanceOrderRepository, MAINTENANCE_ORDER_REPOSITORY } from '../../domain/repositories/maintenance-order.repository';
import { MaintenanceOrderNotFoundException } from '../../domain/exceptions/maintenance-order-not-found.exception';

@Injectable()
export class DeleteMaintenanceOrderUseCase {
  constructor(
    @Inject(MAINTENANCE_ORDER_REPOSITORY)
    private readonly repository: IMaintenanceOrderRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const order = await this.repository.findById(id);
    if (!order) throw new MaintenanceOrderNotFoundException(id);
    await this.repository.delete(id);
  }
}
