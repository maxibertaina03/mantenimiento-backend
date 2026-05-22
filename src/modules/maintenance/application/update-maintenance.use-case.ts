import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';

import {
  MAINTENANCE_REPOSITORY,
  type MaintenanceRepository,
} from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { UpdateMaintenanceInput } from './dto/maintenance-input';

@Injectable()
export class UpdateMaintenanceUseCase {
  constructor(
    @Inject(MAINTENANCE_REPOSITORY) private readonly orders: MaintenanceRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: UpdateMaintenanceInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<MaintenanceOrder> {
    const order = await this.orders.findById(id);
    if (!order) throw new NotFoundError('MaintenanceOrder', id);

    order.updateMetadata({
      location: input.location,
      externalLocation: input.externalLocation,
      scheduledFor: input.scheduledFor === undefined ? undefined : (input.scheduledFor ? new Date(input.scheduledFor) : null),
      technicianId: input.technicianId,
      providerId: input.providerId,
      description: input.description,
      observations: input.observations,
    });

    const saved = await this.orders.save(order);
    await this.audit.write({
      actorId,
      action: 'UPDATE',
      entityType: 'MaintenanceOrder',
      entityId: saved.id,
      payload: input as Record<string, unknown>,
      tenantId,
    });
    return saved;
  }
}
