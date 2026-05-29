import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
import { Decimal } from '@prisma/client/runtime/library';
export declare class MachineResponseDto {
    id: string;
    code: string;
    name: string;
    brand: string | null;
    model: string | null;
    serialNumber: string | null;
    status: MachineStatus;
    usageHours: Decimal;
    location: string | null;
    responsibleId: string | null;
    notes: string | null;
    preventiveIntervalHours: Decimal | null;
    lastPreventiveAtHours: Decimal | null;
    createdAt: Date;
    updatedAt: Date;
}
