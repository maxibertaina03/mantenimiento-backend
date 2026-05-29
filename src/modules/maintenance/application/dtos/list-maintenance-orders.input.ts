import { MaintenanceStatus } from '../../domain/value-objects/maintenance-status.vo';
import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';

export class ListMaintenanceOrdersInput {
  tenantId?: string | null;
  page?: number;
  pageSize?: number;
  status?: MaintenanceStatus;
  type?: MaintenanceType;
}
