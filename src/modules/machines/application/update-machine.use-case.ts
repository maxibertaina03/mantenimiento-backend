import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { UpdateMachineInput } from './dto/machine-input';

@Injectable()
export class UpdateMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: UpdateMachineInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Machine> {
    const machine = await this.machines.findById(id);
    if (!machine) throw new NotFoundError('Machine', id);

    const before = this.snapshot(machine);

    if (input.name !== undefined) machine.rename(input.name);
    machine.updateMetadata(input);

    const saved = await this.machines.save(machine);
    await this.audit.write({
      actorId,
      action: 'UPDATE',
      entityType: 'Machine',
      entityId: saved.id,
      payload: { before, after: this.snapshot(saved) },
      tenantId,
    });
    return saved;
  }

  private snapshot(m: Machine) {
    return {
      name: m.name,
      brand: m.brand,
      model: m.model,
      serialNumber: m.serialNumber,
      location: m.location,
      responsibleId: m.responsibleId,
      preventiveIntervalHours: m.preventive.intervalHours?.toString() ?? null,
    };
  }
}
