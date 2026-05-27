import { MaintenanceOrder } from '../entities/maintenance-order.entity';
export interface IMaintenanceOrderRepository {
  save(order: MaintenanceOrder): Promise<void>;
  findById(id: string): Promise<MaintenanceOrder | null>;
  findByMachineId(machineId: string): Promise<MaintenanceOrder[]>;
  findAll(tenantId?: string | null): Promise<MaintenanceOrder[]>;
  delete(id: string): Promise<void>;
}
export const MAINTENANCE_ORDER_REPOSITORY = 'IMaintenanceOrderRepository';
