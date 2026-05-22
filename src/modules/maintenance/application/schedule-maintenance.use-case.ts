import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { ValidationError } from '@/common/exceptions/domain.exception';
import { MachinePublicService } from '@/modules/machines/application/machine-public.service';

import {
  MAINTENANCE_REPOSITORY,
  type MaintenanceRepository,
} from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { ScheduleMaintenanceInput } from './dto/maintenance-input';

@Injectable()
export class ScheduleMaintenanceUseCase {
  constructor(
    @Inject(MAINTENANCE_REPOSITORY) private readonly orders: MaintenanceRepository,
    private readonly machines: MachinePublicService,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    input: ScheduleMaintenanceInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<MaintenanceOrder> {
    if (input.location === 'EXTERNAL' && !input.providerId) {
      throw new ValidationError(
        'PROVIDER_REQUIRED',
        'El mantenimiento externo requiere un proveedor',
      );
    }
    // Falla con NOT_FOUND si la máquina no existe — pasaje de invariante a Machines.
    await this.machines.requireById(input.machineId);

    const order = await this.orders.create({
      machineId: input.machineId,
      type: input.type,
      location: input.location,
      externalLocation: input.externalLocation ?? null,
      scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : null,
      technicianId: input.technicianId ?? null,
      providerId: input.providerId ?? null,
      description: input.description ?? null,
      tenantId,
    });

    await this.audit.write({
      actorId,
      action: 'CREATE',
      entityType: 'MaintenanceOrder',
      entityId: order.id,
      payload: { machineId: order.machineId, type: order.type, location: order.location },
      tenantId,
    });
    return order;
  }
}
