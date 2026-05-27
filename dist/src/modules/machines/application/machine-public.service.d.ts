import { type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
export declare class MachinePublicService {
    private readonly machines;
    constructor(machines: MachineRepository);
    requireById(id: string): Promise<Machine>;
    markPreventiveCompleted(machineId: string, atHours: string): Promise<void>;
    setStatusFromMaintenance(machineId: string, status: Parameters<Machine['changeStatus']>[0]): Promise<void>;
}
