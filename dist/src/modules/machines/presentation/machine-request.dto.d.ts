import { MachineStatus } from '@prisma/client';
export declare class CreateMachineDto {
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
declare const UpdateMachineDto_base: import("@nestjs/common").Type<Partial<CreateMachineDto>>;
export declare class UpdateMachineDto extends UpdateMachineDto_base {
}
export declare class ChangeMachineStatusDto {
    status: MachineStatus;
    reason?: string;
}
export declare class LogMachineHoursDto {
    hoursAfter: string;
    notes?: string | null;
}
export declare class ListMachinesQueryDto {
    page?: number;
    pageSize?: number;
    status?: MachineStatus;
    responsibleId?: string;
    search?: string;
}
export {};
