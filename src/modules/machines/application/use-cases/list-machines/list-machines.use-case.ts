import { Injectable, Inject } from '@nestjs/common';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../domain/repositories/machine.repository';
import { ListMachinesInput } from '../dtos/list-machines.input';
import { ListMachinesOutput, MachineListItemDto } from '../dtos/list-machines.output';

@Injectable()
export class ListMachinesUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY)
    private readonly repository: IMachineRepository,
  ) {}

  async execute(input: ListMachinesInput): Promise<ListMachinesOutput> {
    const machines = await this.repository.findAll(input.tenantId);

    const start = ((input.page ?? 1) - 1) * (input.pageSize ?? 10);
    const end = start + (input.pageSize ?? 10);
    const paginatedMachines = machines.slice(start, end);

    const items: MachineListItemDto[] = paginatedMachines.map((m) => ({
      id: m.getId(),
      code: m.getCode(),
      name: m.getName(),
      status: m.getStatus(),
      usageHours: m.getUsageHours(),
      location: m.getLocation(),
      createdAt: m.getCreatedAt(),
    }));

    return {
      items,
      total: machines.length,
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 10,
    };
  }
}
