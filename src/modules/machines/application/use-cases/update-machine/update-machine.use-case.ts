import { Injectable, Inject } from '@nestjs/common';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../../domain/repositories/machine.repository';
import { MachineNotFoundException } from '../../../domain/exceptions/machine-not-found.exception';
import { CreateMachineOutput } from '../../dtos/create-machine.output';
import { MachineAppMapper } from '../../mappers/machine-app.mapper';

export class UpdateMachineInput {
  id!: string;
  name?: string;
  location?: string | null;
}

@Injectable()
export class UpdateMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY)
    private readonly repository: IMachineRepository,
  ) {}

  async execute(input: UpdateMachineInput): Promise<CreateMachineOutput> {
    const machine = await this.repository.findById(input.id);
    if (!machine) throw new MachineNotFoundException(input.id);

    if (input.name) machine.changeName(input.name);
    if (input.location !== undefined) machine.updateLocation(input.location);

    await this.repository.save(machine);
    return MachineAppMapper.toOutput(machine);
  }
}
