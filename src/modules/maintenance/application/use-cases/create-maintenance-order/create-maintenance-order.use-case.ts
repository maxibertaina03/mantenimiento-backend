import { Injectable, Inject } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { MaintenanceOrder } from '../../../domain/entities/maintenance-order.entity';
import { IMaintenanceOrderRepository, MAINTENANCE_ORDER_REPOSITORY } from '../../../domain/repositories/maintenance-order.repository';
import { MaintenanceStatus } from '../../../domain/value-objects/maintenance-status.vo';
import { MaintenanceLocation } from '../../../domain/value-objects/maintenance-location.vo';
import { CreateMaintenanceOrderInput } from '../../dtos/create-maintenance-order.input';
import { CreateMaintenanceOrderOutput } from '../../dtos/create-maintenance-order.output';
import { MaintenanceOrderAppMapper } from '../../mappers/maintenance-order-app.mapper';

@Injectable()
export class CreateMaintenanceOrderUseCase {
  constructor(
    @Inject(MAINTENANCE_ORDER_REPOSITORY)
    private readonly repository: IMaintenanceOrderRepository,
  ) {}

  async execute(input: CreateMaintenanceOrderInput): Promise<CreateMaintenanceOrderOutput> {
    const order = new MaintenanceOrder(
      generateUUID(),
      input.machineId,
      input.type,
      MaintenanceStatus.SCHEDULED,
      input.location ?? MaintenanceLocation.INTERNAL,
      input.externalLocation ?? null,
      input.scheduledFor ?? null,
      null, // startedAt
      null, // completedAt
      null, // machineHoursSnapshot
      input.technicianId ?? null,
      input.providerId ?? null,
      input.cost ?? null,
      input.currency ?? 'ARS',
      input.description ?? null,
      input.observations ?? null,
      null, // tenantId
    );

    await this.repository.save(order);
    return MaintenanceOrderAppMapper.toOutput(order);
  }
}
