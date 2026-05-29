import { IMachineRepository } from '../../../domain/repositories/machine.repository';
import { CreateMachineOutput } from '../../dtos/create-machine.output';
export declare class GetMachineUseCase {
    private readonly repository;
    constructor(repository: IMachineRepository);
    execute(id: string): Promise<CreateMachineOutput>;
}
