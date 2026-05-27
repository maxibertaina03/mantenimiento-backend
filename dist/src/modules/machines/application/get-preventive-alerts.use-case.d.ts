import { type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
export interface PreventiveAlert {
    machine: Machine;
    overdueByHours: string;
}
export declare class GetPreventiveAlertsUseCase {
    private readonly machines;
    constructor(machines: MachineRepository);
    execute(tenantId: string | null): Promise<PreventiveAlert[]>;
}
