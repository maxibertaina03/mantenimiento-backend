import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { ChangeMachineStatusInput } from './dto/machine-input';

@Injectable()
export class ChangeMachineStatusUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: ChangeMachineStatusInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Machine> {
    const machine = await this.machines.findById(id);
    if (!machine) throw new NotFoundError('Machine', id);

    const { from, to } = machine.changeStatus(input.status);
    const saved = await this.machines.save(machine);

    await this.audit.write({
      actorId,
      action: 'STATE_CHANGE',
      entityType: 'Machine',
      entityId: saved.id,
      payload: { from, to, reason: input.reason },
      tenantId,
    });
    return saved;
  }
}
