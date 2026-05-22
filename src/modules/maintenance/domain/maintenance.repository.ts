import type {
  MaintenanceLocation,
  MaintenanceStatus,
  MaintenanceType,
} from '@prisma/client';
import type { MaintenanceOrder } from './maintenance-order.entity';

export interface CreateMaintenanceProps {
  machineId: string;
  type: MaintenanceType;
  location: MaintenanceLocation;
  externalLocation?: string | null;
  scheduledFor?: Date | null;
  technicianId?: string | null;
  providerId?: string | null;
  description?: string | null;
  tenantId?: string | null;
}

export interface ListMaintenanceQuery {
  skip?: number;
  take?: number;
  machineId?: string;
  status?: MaintenanceStatus;
  type?: MaintenanceType;
  technicianId?: string;
  providerId?: string;
  /** ISO date - rango (>=) */
  scheduledFrom?: Date;
  /** ISO date - rango (<=) */
  scheduledTo?: Date;
}

export interface MaintenanceRepository {
  create(props: CreateMaintenanceProps): Promise<MaintenanceOrder>;
  findById(id: string): Promise<MaintenanceOrder | null>;
  list(query: ListMaintenanceQuery): Promise<{ items: MaintenanceOrder[]; total: number }>;
  save(order: MaintenanceOrder): Promise<MaintenanceOrder>;
  softDelete(id: string): Promise<void>;

  /** Cuenta pendientes (SCHEDULED|IN_PROGRESS) por filtros opcionales. */
  countPending(tenantId?: string | null): Promise<number>;
}

export const MAINTENANCE_REPOSITORY = Symbol('MaintenanceRepository');
