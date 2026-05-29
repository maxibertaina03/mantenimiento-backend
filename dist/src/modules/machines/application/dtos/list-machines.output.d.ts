import { Decimal } from '@prisma/client/runtime/library';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
export declare class MachineListItemDto {
    id: string;
    code: string;
    name: string;
    status: MachineStatus;
    usageHours: Decimal;
    location: string | null;
    brand: string | null;
}
export declare class ListMachinesOutput {
    items: MachineListItemDto[];
    total: number;
    page: number;
    pageSize: number;
}
