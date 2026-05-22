import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { ConflictError } from '@/common/exceptions/domain.exception';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { RegisterMachineInput } from './dto/machine-input';

@Injectable()
export class RegisterMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(input: RegisterMachineInput, actorId: string, tenantId: string | null): Promise<Machine> {
    const existing = await this.machines.findByCode(input.code);
    if (existing) {
      throw new ConflictError('MACHINE_CODE_TAKEN', `El código ${input.code} ya está en uso`);
    }
    const machine = await this.machines.create({
      code: input.code,
      name: input.name,
      brand: input.brand ?? null,
      model: input.model ?? null,
      serialNumber: input.serialNumber ?? null,
      usageHours: input.initialUsageHours ?? '0',
      location: input.location ?? null,
      responsibleId: input.responsibleId ?? null,
      notes: input.notes ?? null,
      preventiveIntervalHours: input.preventiveIntervalHours ?? null,
      tenantId,
    });
    await this.audit.write({
      actorId,
      action: 'CREATE',
      entityType: 'Machine',
      entityId: machine.id,
      payload: { code: machine.code, name: machine.name },
      tenantId,
    });
    return machine;
  }
}
