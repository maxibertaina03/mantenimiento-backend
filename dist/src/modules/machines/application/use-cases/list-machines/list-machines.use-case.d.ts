import { IMachineRepository } from '../../../domain/repositories/machine.repository';
import { ListMachinesInput } from '../../dtos/list-machines.input';
import type { CreateMachineOutput } from '../../dtos/create-machine.output';
export interface ListMachinesOutput {
    items: CreateMachineOutput[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListMachinesUseCase {
    private readonly repository;
    constructor(repository: IMachineRepository);
    execute(input: ListMachinesInput): Promise<ListMachinesOutput>;
}
