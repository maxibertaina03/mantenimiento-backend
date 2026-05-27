import type { UsageLogEntry } from '../domain/machine.repository';
export declare class UsageLogResponseDto {
    id: string;
    machineId: string;
    hoursBefore: string;
    hoursAfter: string;
    delta: string;
    notes: string | null;
    createdById: string;
    createdAt: string;
    static from(log: UsageLogEntry): UsageLogResponseDto;
}
