import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceStatus } from '../../domain/value-objects/maintenance-status.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';
export declare class MaintenanceOrderListItemDto {
    id: string;
    machineId: string;
    type: MaintenanceType;
    status: MaintenanceStatus;
    location: MaintenanceLocation;
    scheduledFor: Date | null;
    startedAt: Date | null;
    createdAt: Date;
}
export declare class ListMaintenanceOrdersOutput {
    items: MaintenanceOrderListItemDto[];
    total: number;
    page: number;
    pageSize: number;
}
