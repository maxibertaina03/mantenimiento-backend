import { type MachineRepository, type UsageLogEntry } from '../domain/machine.repository';
export declare class ListUsageLogsUseCase {
    private readonly machines;
    constructor(machines: MachineRepository);
    execute(machineId: string, page?: number, pageSize?: number): Promise<UsageLogEntry[]>;
}
