import type { MachineStatus } from '@prisma/client';
import type { Machine } from '../domain/machine.entity';
export declare class MachineResponseDto {
    id: string;
    code: string;
    name: string;
    brand: string | null;
    model: string | null;
    serialNumber: string | null;
    status: MachineStatus;
    usageHours: string;
    location: string | null;
    responsibleId: string | null;
    notes: string | null;
    preventiveIntervalHours: string | null;
    lastPreventiveAtHours: string | null;
    preventiveDue: boolean;
    hoursUntilPreventive: string | null;
    tenantId: string | null;
    createdAt: string;
    updatedAt: string;
    static from(m: Machine): MachineResponseDto;
}
export declare class PaginatedMachineResponseDto {
    items: MachineResponseDto[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class PreventiveAlertDto {
    machine: MachineResponseDto;
    overdueByHours: string;
}
