import { MaintenanceOrder } from '../entities/maintenance-order.entity';
import { MaintenanceStatus } from '../value-objects/maintenance-status.vo';
import { MaintenanceType } from '../value-objects/maintenance-type.vo';

export interface MaintenanceOrderFilters {
  tenantId?: string | null;
  machineId?: string;
  status?: MaintenanceStatus;
  type?: MaintenanceType;
  technicianId?: string;
  providerId?: string;
  scheduledFrom?: Date;
  scheduledTo?: Date;
}

export interface IMaintenanceOrderRepository {
  save(order: MaintenanceOrder): Promise<void>;
  findById(id: string): Promise<MaintenanceOrder | null>;
  findAll(filters?: MaintenanceOrderFilters): Promise<MaintenanceOrder[]>;
  delete(id: string): Promise<void>;
}

export const MAINTENANCE_ORDER_REPOSITORY = 'IMaintenanceOrderRepository';
