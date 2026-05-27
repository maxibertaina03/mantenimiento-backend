import { type MaintenanceRepository } from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { ListMaintenanceInput } from './dto/maintenance-input';
export interface PaginatedMaintenance {
    items: MaintenanceOrder[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListMaintenanceUseCase {
    private readonly orders;
    constructor(orders: MaintenanceRepository);
    execute(input: ListMaintenanceInput): Promise<PaginatedMaintenance>;
}
