import { MaintenanceStatus } from '../../domain/value-objects/maintenance-status.vo';
import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';
import { Decimal } from '@prisma/client/runtime/library';
export declare class MaintenanceOrderResponseDto {
    id: string;
    machineId: string;
    type: MaintenanceType;
    status: MaintenanceStatus;
    location: MaintenanceLocation;
    cost: Decimal | null;
    createdAt: Date;
    updatedAt: Date;
}
