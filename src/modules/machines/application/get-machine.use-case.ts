import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';

@Injectable()
export class GetMachineUseCase {
  constructor(@Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository) {}

  async execute(id: string): Promise<Machine> {
    const machine = await this.machines.findById(id);
    if (!machine) throw new NotFoundError('Machine', id);
    return machine;
  }
}
