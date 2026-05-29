import { Injectable, Inject } from '@nestjs/common';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../../domain/repositories/machine.repository';
import { MachineNotFoundException } from '../../../domain/exceptions/machine-not-found.exception';

@Injectable()
export class DeleteMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY)
    private readonly repository: IMachineRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const machine = await this.repository.findById(id);
    if (!machine) throw new MachineNotFoundException(id);
    await this.repository.delete(id);
  }
}
