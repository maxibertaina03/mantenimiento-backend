import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
export declare class CreateMachineRequestDto {
    code: string;
    name: string;
    brand?: string | null;
    model?: string | null;
    serialNumber?: string | null;
    status?: MachineStatus;
    usageHours?: number;
    location?: string | null;
    responsibleId?: string | null;
    notes?: string | null;
    preventiveIntervalHours?: number | null;
}
