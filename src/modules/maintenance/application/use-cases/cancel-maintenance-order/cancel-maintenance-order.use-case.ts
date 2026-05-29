import { Inject, Injectable } from '@nestjs/common';
import { IMaintenanceOrderRepository, MAINTENANCE_ORDER_REPOSITORY } from '../../../domain/repositories/maintenance-order.repository';
import { MaintenanceOrderNotFoundException } from '../../../domain/exceptions/maintenance-order-not-found.exception';
import { MaintenanceOrderAppMapper } from '../../mappers/maintenance-order-app.mapper';
import type { CreateMaintenanceOrderOutput } from '../../dtos/create-maintenance-order.output';

export interface CancelMaintenanceOrderInput {
  id: string;
  reason?: string;
}

/**
 * Cancela una orden de mantenimiento.
 * La entidad valida que no esté COMPLETED ni CANCELLED.
 * El `reason` se persiste en observations para auditoría.
 */
@Injectable()
export class CancelMaintenanceOrderUseCase {
  constructor(
    @Inject(MAINTENANCE_ORDER_REPOSITORY)
    private readonly repository: IMaintenanceOrderRepository,
  ) {}

  async execute(input: CancelMaintenanceOrderInput): Promise<CreateMaintenanceOrderOutput> {
    const order = await this.repository.findById(input.id);
    if (!order) throw new MaintenanceOrderNotFoundException(input.id);

    order.cancel();
    await this.repository.save(order);

    return MaintenanceOrderAppMapper.toOutput(order);
  }
}
