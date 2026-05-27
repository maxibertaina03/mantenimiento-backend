import { type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
export declare class GetMachineUseCase {
    private readonly machines;
    constructor(machines: MachineRepository);
    execute(id: string): Promise<Machine>;
}
