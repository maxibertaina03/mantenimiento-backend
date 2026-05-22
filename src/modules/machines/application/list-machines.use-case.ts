import { Inject, Injectable } from '@nestjs/common';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { ListMachinesInput } from './dto/machine-input';

export interface PaginatedMachines {
  items: Machine[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListMachinesUseCase {
  constructor(@Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository) {}

  async execute(input: ListMachinesInput): Promise<PaginatedMachines> {
    const page = Math.max(1, input.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, input.pageSize ?? 20));
    const { items, total } = await this.machines.list({
      skip: (page - 1) * pageSize,
      take: pageSize,
      status: input.status,
      responsibleId: input.responsibleId,
      search: input.search?.trim() || undefined,
    });
    return { items, total, page, pageSize };
  }
}
