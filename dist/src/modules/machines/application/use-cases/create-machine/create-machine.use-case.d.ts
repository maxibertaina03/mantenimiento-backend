import { IMachineRepository } from '../../../domain/repositories/machine.repository';
import { CreateMachineInput } from '../../dtos/create-machine.input';
import { CreateMachineOutput } from '../../dtos/create-machine.output';
export declare class CreateMachineUseCase {
    private readonly repository;
    constructor(repository: IMachineRepository);
    execute(input: CreateMachineInput): Promise<CreateMachineOutput>;
}
