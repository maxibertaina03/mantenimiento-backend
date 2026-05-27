import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MachineRepository, type UsageLogEntry } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { LogMachineHoursInput } from './dto/machine-input';
export interface LogHoursResult {
    machine: Machine;
    log: UsageLogEntry;
}
export declare class LogMachineHoursUseCase {
    private readonly machines;
    private readonly audit;
    constructor(machines: MachineRepository, audit: AuditWriter);
    execute(id: string, input: LogMachineHoursInput, actorId: string, tenantId: string | null): Promise<LogHoursResult>;
}
