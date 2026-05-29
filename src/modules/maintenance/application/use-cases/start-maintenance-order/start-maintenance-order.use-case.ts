import { Injectable, Inject } from '@nestjs/common';
import { IMaintenanceOrderRepository, MAINTENANCE_ORDER_REPOSITORY } from '../../../domain/repositories/maintenance-order.repository';
import { MaintenanceOrderNotFoundException } from '../../../domain/exceptions/maintenance-order-not-found.exception';
import { CreateMaintenanceOrderOutput } from '../../dtos/create-maintenance-order.output';
import { MaintenanceOrderAppMapper } from '../../mappers/maintenance-order-app.mapper';

@Injectable()
export class StartMaintenanceOrderUseCase {
  constructor(
    @Inject(MAINTENANCE_ORDER_REPOSITORY)
    private readonly repository: IMaintenanceOrderRepository,
  ) {}

  async execute(id: string): Promise<CreateMaintenanceOrderOutput> {
    const order = await this.repository.findById(id);
    if (!order) throw new MaintenanceOrderNotFoundException(id);

    order.start();
    await this.repository.save(order);
    return MaintenanceOrderAppMapper.toOutput(order);
  }
}
