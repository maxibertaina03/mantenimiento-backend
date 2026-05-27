import { Injectable, Inject } from '@nestjs/common';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../domain/repositories/machine.repository';
import { MachineNotFoundException } from '../../domain/exceptions/machine-not-found.exception';
import { CreateMachineOutput } from '../dtos/create-machine.output';
import { MachineAppMapper } from '../mappers/machine-app.mapper';

@Injectable()
export class GetMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY)
    private readonly repository: IMachineRepository,
  ) {}

  async execute(id: string): Promise<CreateMachineOutput> {
    const machine = await this.repository.findById(id);
    if (!machine) throw new MachineNotFoundException(id);
    return MachineAppMapper.toOutput(machine);
  }
}
