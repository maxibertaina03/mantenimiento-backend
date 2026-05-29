import { Injectable, Inject } from '@nestjs/common';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../../domain/repositories/machine.repository';
import { MachineAppMapper } from '../../mappers/machine-app.mapper';
import { ListMachinesInput } from '../../dtos/list-machines.input';
import type { CreateMachineOutput } from '../../dtos/create-machine.output';

export interface ListMachinesOutput {
  items: CreateMachineOutput[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListMachinesUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY)
    private readonly repository: IMachineRepository,
  ) {}

  async execute(input: ListMachinesInput): Promise<ListMachinesOutput> {
    const machines = await this.repository.findAll({
      tenantId: input.tenantId,
      search: input.search,
      status: input.status,
      responsibleId: input.responsibleId,
    });

    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedMachines = machines.slice(start, end);

    const items = paginatedMachines.map((m) => MachineAppMapper.toOutput(m));

    return {
      items,
      total: machines.length,
      page,
      pageSize,
    };
  }
}
