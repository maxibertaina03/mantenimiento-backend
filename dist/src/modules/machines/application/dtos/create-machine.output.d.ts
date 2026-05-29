import { Decimal } from '@prisma/client/runtime/library';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
export declare class CreateMachineOutput {
    id: string;
    code: string;
    name: string;
    status: MachineStatus;
    brand: string | null;
    model: string | null;
    serialNumber: string | null;
    usageHours: Decimal;
    location: string | null;
    responsibleId: string | null;
    notes: string | null;
    preventiveIntervalHours: Decimal | null;
    lastPreventiveAtHours: Decimal | null;
    createdAt: Date;
}
