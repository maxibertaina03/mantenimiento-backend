import { Inject, Injectable } from '@nestjs/common';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';

export interface PreventiveAlert {
  machine: Machine;
  overdueByHours: string;
}

@Injectable()
export class GetPreventiveAlertsUseCase {
  constructor(@Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository) {}

  async execute(tenantId: string | null): Promise<PreventiveAlert[]> {
    const due = await this.machines.findPreventiveDue(tenantId);
    return due
      .filter((m) => m.isPreventiveDue())
      .map((machine) => {
        const remaining = machine.hoursUntilPreventive();
        const overdueBy = remaining ? remaining.negated().toString() : '0';
        return { machine, overdueByHours: overdueBy };
      });
  }
}
