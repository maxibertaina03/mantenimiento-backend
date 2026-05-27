import type { MachineStatus, Prisma } from '@prisma/client';
import type { Machine } from './machine.entity';
export interface CreateMachineProps {
    code: string;
    name: string;
    brand?: string | null;
    model?: string | null;
    serialNumber?: string | null;
    status?: MachineStatus;
    usageHours?: string;
    location?: string | null;
    responsibleId?: string | null;
    notes?: string | null;
    preventiveIntervalHours?: string | null;
    tenantId?: string | null;
}
export interface ListMachinesQuery {
    skip?: number;
    take?: number;
    status?: MachineStatus;
    responsibleId?: string;
    search?: string;
}
export interface MachineUsageLogProps {
    machineId: string;
    hoursBefore: string | Prisma.Decimal;
    hoursAfter: string | Prisma.Decimal;
    delta: string | Prisma.Decimal;
    notes?: string | null;
    createdById: string;
    tenantId?: string | null;
}
export interface UsageLogEntry {
    id: string;
    machineId: string;
    hoursBefore: Prisma.Decimal;
    hoursAfter: Prisma.Decimal;
    delta: Prisma.Decimal;
    notes: string | null;
    createdById: string;
    createdAt: Date;
}
export interface MachineRepository {
    create(props: CreateMachineProps): Promise<Machine>;
    findById(id: string): Promise<Machine | null>;
    findByCode(code: string): Promise<Machine | null>;
    list(query: ListMachinesQuery): Promise<{
        items: Machine[];
        total: number;
    }>;
    save(machine: Machine): Promise<Machine>;
    softDelete(id: string): Promise<void>;
    logUsageAndSave(machine: Machine, log: Omit<MachineUsageLogProps, 'machineId' | 'tenantId'>): Promise<UsageLogEntry>;
    listUsageLogs(machineId: string, skip?: number, take?: number): Promise<UsageLogEntry[]>;
    findPreventiveDue(tenantId?: string | null): Promise<Machine[]>;
}
export declare const MACHINE_REPOSITORY: unique symbol;
