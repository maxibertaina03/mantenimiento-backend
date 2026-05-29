import { MaintenanceOrder } from '../entities/maintenance-order.entity';
export interface IMaintenanceOrderRepository {
    save(order: MaintenanceOrder): Promise<void>;
    findById(id: string): Promise<MaintenanceOrder | null>;
    findAll(tenantId?: string | null): Promise<MaintenanceOrder[]>;
    delete(id: string): Promise<void>;
}
export declare const MAINTENANCE_ORDER_REPOSITORY = "IMaintenanceOrderRepository";
