import { MaintenanceLocation, MaintenanceStatus, MaintenanceType } from '@prisma/client';
export declare class ScheduleMaintenanceDto {
    machineId: string;
    type: MaintenanceType;
    location: MaintenanceLocation;
    externalLocation?: string | null;
    scheduledFor?: string | null;
    technicianId?: string | null;
    providerId?: string | null;
    description?: string | null;
}
export declare class UpdateMaintenanceDto {
    location?: MaintenanceLocation;
    externalLocation?: string | null;
    scheduledFor?: string | null;
    technicianId?: string | null;
    providerId?: string | null;
    description?: string | null;
    observations?: string | null;
}
export declare class CompleteMaintenanceDto {
    machineHoursSnapshot: string;
    cost?: string | null;
    currency?: string | null;
    observations?: string | null;
}
export declare class CancelMaintenanceDto {
    reason?: string;
}
export declare class ListMaintenanceQueryDto {
    page?: number;
    pageSize?: number;
    machineId?: string;
    status?: MaintenanceStatus;
    type?: MaintenanceType;
    technicianId?: string;
    providerId?: string;
    scheduledFrom?: string;
    scheduledTo?: string;
}
