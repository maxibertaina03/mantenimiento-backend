import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';

@Injectable()
export class DeleteMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(id: string, actorId: string, tenantId: string | null): Promise<void> {
    const machine = await this.machines.findById(id);
    if (!machine) throw new NotFoundError('Machine', id);
    await this.machines.softDelete(id);
    await this.audit.write({
      actorId,
      action: 'DELETE',
      entityType: 'Machine',
      entityId: id,
      payload: { code: machine.code, name: machine.name },
      tenantId,
    });
  }
}
