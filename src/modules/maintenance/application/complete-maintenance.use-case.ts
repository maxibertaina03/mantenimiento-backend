import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MachinePublicService } from '@/modules/machines/application/machine-public.service';

import {
  MAINTENANCE_REPOSITORY,
  type MaintenanceRepository,
} from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { CompleteMaintenanceInput } from './dto/maintenance-input';

@Injectable()
export class CompleteMaintenanceUseCase {
  constructor(
    @Inject(MAINTENANCE_REPOSITORY) private readonly orders: MaintenanceRepository,
    private readonly machines: MachinePublicService,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: CompleteMaintenanceInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<MaintenanceOrder> {
    const order = await this.orders.findById(id);
    if (!order) throw new NotFoundError('MaintenanceOrder', id);

    const { from, to, hoursSnapshot } = order.complete(input);
    const saved = await this.orders.save(order);

    // Si fue preventivo, actualizamos el contador en Machine.
    if (saved.type === 'PREVENTIVE') {
      await this.machines.markPreventiveCompleted(saved.machineId, hoursSnapshot.toString());
    }
    // Devolver la máquina a OPERATIONAL.
    const machineNext = saved.derivedMachineStatus();
    if (machineNext) {
      await this.machines.setStatusFromMaintenance(saved.machineId, machineNext);
    }

    await this.audit.write({
      actorId,
      action: 'STATE_CHANGE',
      entityType: 'MaintenanceOrder',
      entityId: saved.id,
      payload: {
        from,
        to,
        machineHoursSnapshot: hoursSnapshot.toString(),
        cost: saved.cost?.toString() ?? null,
        type: saved.type,
      },
      tenantId,
    });
    return saved;
  }
}
