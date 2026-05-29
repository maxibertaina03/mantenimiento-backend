import { IMachineRepository } from '../../../domain/repositories/machine.repository';
import { CreateMachineOutput } from '../../dtos/create-machine.output';
export declare class UpdateMachineInput {
    id: string;
    name?: string;
    location?: string | null;
}
export declare class UpdateMachineUseCase {
    private readonly repository;
    constructor(repository: IMachineRepository);
    execute(input: UpdateMachineInput): Promise<CreateMachineOutput>;
}
