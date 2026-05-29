import { Inject, Injectable } from '@nestjs/common';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../../domain/repositories/machine.repository';
import { MachineNotFoundException } from '../../../domain/exceptions/machine-not-found.exception';
import { MachineStatus } from '../../../domain/value-objects/machine-status.vo';
import { MachineAppMapper } from '../../mappers/machine-app.mapper';
import type { CreateMachineOutput } from '../../dtos/create-machine.output';

export interface ChangeMachineStatusInput {
  id: string;
  status: MachineStatus;
  reason?: string;
}

@Injectable()
export class ChangeMachineStatusUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY) private readonly repository: IMachineRepository,
  ) {}

  async execute(input: ChangeMachineStatusInput): Promise<CreateMachineOutput> {
    const machine = await this.repository.findById(input.id);
    if (!machine) throw new MachineNotFoundException(input.id);

    machine.changeStatus(input.status);
    await this.repository.save(machine);

    return MachineAppMapper.toOutput(machine);
  }
}
