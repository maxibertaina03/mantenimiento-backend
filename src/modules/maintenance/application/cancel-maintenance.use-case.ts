import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MachinePublicService } from '@/modules/machines/application/machine-public.service';

import {
  MAINTENANCE_REPOSITORY,
  type MaintenanceRepository,
} from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { CancelMaintenanceInput } from './dto/maintenance-input';

@Injectable()
export class CancelMaintenanceUseCase {
  constructor(
    @Inject(MAINTENANCE_REPOSITORY) private readonly orders: MaintenanceRepository,
    private readonly machines: MachinePublicService,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: CancelMaintenanceInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<MaintenanceOrder> {
    const order = await this.orders.findById(id);
    if (!order) throw new NotFoundError('MaintenanceOrder', id);

    const wasInProgress = order.status === 'IN_PROGRESS';
    const { from, to } = order.cancel(input.reason);
    const saved = await this.orders.save(order);

    // Si estaba en progreso, la máquina vuelve a OPERATIONAL.
    if (wasInProgress) {
      const machineNext = saved.derivedMachineStatus();
      if (machineNext) {
        await this.machines.setStatusFromMaintenance(saved.machineId, machineNext);
      }
    }

    await this.audit.write({
      actorId,
      action: 'STATE_CHANGE',
      entityType: 'MaintenanceOrder',
      entityId: saved.id,
      payload: { from, to, reason: input.reason },
      tenantId,
    });
    return saved;
  }
}
