import { Decimal } from '@prisma/client/runtime/library';
import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceStatus } from '../../domain/value-objects/maintenance-status.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';

export class CreateMaintenanceOrderOutput {
  id!: string;
  machineId!: string;
  type!: MaintenanceType;
  status!: MaintenanceStatus;
  location!: MaintenanceLocation;
  externalLocation!: string | null;
  scheduledFor!: Date | null;
  startedAt!: Date | null;
  completedAt!: Date | null;
  technicianId!: string | null;
  providerId!: string | null;
  cost!: Decimal | null;
  currency!: string;
  description!: string | null;
  observations!: string | null;
  createdAt!: Date;
}
