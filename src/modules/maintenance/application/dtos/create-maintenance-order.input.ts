import { Decimal } from '@prisma/client/runtime/library';
import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';

export class CreateMaintenanceOrderInput {
  machineId!: string;
  type!: MaintenanceType;
  location?: MaintenanceLocation;
  externalLocation?: string | null;
  scheduledFor?: Date | null;
  technicianId?: string | null;
  providerId?: string | null;
  cost?: Decimal | null;
  currency?: string;
  description?: string | null;
  observations?: string | null;
}
