import { IMachineRepository } from '../../../domain/repositories/machine.repository';
import { ListMachinesInput } from '../../dtos/list-machines.input';
import { ListMachinesOutput } from '../../dtos/list-machines.output';
export declare class ListMachinesUseCase {
    private readonly repository;
    constructor(repository: IMachineRepository);
    execute(input: ListMachinesInput): Promise<ListMachinesOutput>;
}
