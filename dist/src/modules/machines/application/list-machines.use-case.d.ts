import { type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { ListMachinesInput } from './dto/machine-input';
export interface PaginatedMachines {
    items: Machine[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListMachinesUseCase {
    private readonly machines;
    constructor(machines: MachineRepository);
    execute(input: ListMachinesInput): Promise<PaginatedMachines>;
}
