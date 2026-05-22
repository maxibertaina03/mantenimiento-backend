import type {
  MaintenanceLocation,
  MaintenanceStatus,
  MaintenanceType,
} from '@prisma/client';

export interface ScheduleMaintenanceInput {
  machineId: string;
  type: MaintenanceType;
  location: MaintenanceLocation;
  externalLocation?: string | null;
  scheduledFor?: string | null;
  technicianId?: string | null;
  providerId?: string | null;
  description?: string | null;
}

export interface UpdateMaintenanceInput {
  location?: MaintenanceLocation;
  externalLocation?: string | null;
  scheduledFor?: string | null;
  technicianId?: string | null;
  providerId?: string | null;
  description?: string | null;
  observations?: string | null;
}

export interface CompleteMaintenanceInput {
  machineHoursSnapshot: string;
  cost?: string | null;
  currency?: string | null;
  observations?: string | null;
}

export interface CancelMaintenanceInput {
  reason?: string;
}

export interface ListMaintenanceInput {
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
