import type { MaintenanceLocation, MaintenanceStatus, MaintenanceType } from '@prisma/client';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
export declare class MaintenanceResponseDto {
    id: string;
    machineId: string;
    type: MaintenanceType;
    status: MaintenanceStatus;
    location: MaintenanceLocation;
    externalLocation: string | null;
    scheduledFor: string | null;
    startedAt: string | null;
    completedAt: string | null;
    machineHoursSnapshot: string | null;
    technicianId: string | null;
    providerId: string | null;
    cost: string | null;
    currency: string | null;
    description: string | null;
    observations: string | null;
    tenantId: string | null;
    createdAt: string;
    updatedAt: string;
    static from(o: MaintenanceOrder): MaintenanceResponseDto;
}
export declare class PaginatedMaintenanceResponseDto {
    items: MaintenanceResponseDto[];
    total: number;
    page: number;
    pageSize: number;
}
