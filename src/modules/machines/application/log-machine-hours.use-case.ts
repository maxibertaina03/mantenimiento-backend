import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import {
  MACHINE_REPOSITORY,
  type MachineRepository,
  type UsageLogEntry,
} from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { LogMachineHoursInput } from './dto/machine-input';

export interface LogHoursResult {
  machine: Machine;
  log: UsageLogEntry;
}

@Injectable()
export class LogMachineHoursUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: LogMachineHoursInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<LogHoursResult> {
    const machine = await this.machines.findById(id);
    if (!machine) throw new NotFoundError('Machine', id);

    const { hoursBefore, hoursAfter, delta } = machine.logUsageHours({
      hoursAfter: input.hoursAfter,
    });

    const log = await this.machines.logUsageAndSave(machine, {
      hoursBefore,
      hoursAfter,
      delta,
      notes: input.notes ?? null,
      createdById: actorId,
    });

    await this.audit.write({
      actorId,
      action: 'UPDATE',
      entityType: 'Machine',
      entityId: machine.id,
      payload: {
        kind: 'USAGE_LOG',
        hoursBefore: hoursBefore.toString(),
        hoursAfter: hoursAfter.toString(),
        delta: delta.toString(),
        preventiveDue: machine.isPreventiveDue(),
      },
      tenantId,
    });

    return { machine, log };
  }
}
