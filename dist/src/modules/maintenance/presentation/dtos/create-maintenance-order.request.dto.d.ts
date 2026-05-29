import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';
export declare class CreateMaintenanceOrderRequestDto {
    machineId: string;
    type: MaintenanceType;
    location?: MaintenanceLocation;
    externalLocation?: string | null;
    scheduledFor?: string | null;
    technicianId?: string | null;
    providerId?: string | null;
    cost?: number | null;
    currency?: string;
    description?: string | null;
    observations?: string | null;
}
