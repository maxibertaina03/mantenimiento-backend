import { IMachineRepository } from '../../../domain/repositories/machine.repository';
export declare class DeleteMachineUseCase {
    private readonly repository;
    constructor(repository: IMachineRepository);
    execute(id: string): Promise<void>;
}
