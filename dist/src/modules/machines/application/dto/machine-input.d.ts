import type { MachineStatus } from '@prisma/client';
export interface RegisterMachineInput {
    code: string;
    name: string;
    brand?: string | null;
    model?: string | null;
    serialNumber?: string | null;
    initialUsageHours?: string;
    location?: string | null;
    responsibleId?: string | null;
    notes?: string | null;
    preventiveIntervalHours?: string | null;
}
export interface UpdateMachineInput {
    name?: string;
    brand?: string | null;
    model?: string | null;
    serialNumber?: string | null;
    location?: string | null;
    responsibleId?: string | null;
    notes?: string | null;
    preventiveIntervalHours?: string | null;
}
export interface ChangeMachineStatusInput {
    status: MachineStatus;
    reason?: string;
}
export interface LogMachineHoursInput {
    hoursAfter: string;
    notes?: string | null;
}
export interface ListMachinesInput {
    page?: number;
    pageSize?: number;
    status?: MachineStatus;
    responsibleId?: string;
    search?: string;
}
