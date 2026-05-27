import { InvalidMaintenanceException } from '../exceptions/invalid-maintenance.exception';
import { MaintenanceStatus } from '../value-objects/maintenance-status.vo';
import { MaintenanceType } from '../value-objects/maintenance-type.vo';
import { MaintenanceLocation } from '../value-objects/maintenance-location.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class MaintenanceOrder {
  private id: string;
  private machineId: string;
  private type: MaintenanceType;
  private status: MaintenanceStatus;
  private location: MaintenanceLocation;
  private externalLocation: string | null;
  private scheduledFor: Date | null;
  private startedAt: Date | null;
  private completedAt: Date | null;
  private machineHoursSnapshot: Decimal | null;
  private technicianId: string | null;
  private providerId: string | null;
  private cost: Decimal | null;
  private currency: string;
  private description: string | null;
  private observations: string | null;
  private tenantId: string | null;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    machineId: string,
    type: MaintenanceType,
    status: MaintenanceStatus = MaintenanceStatus.SCHEDULED,
    location: MaintenanceLocation = MaintenanceLocation.INTERNAL,
    externalLocation: string | null = null,
    scheduledFor: Date | null = null,
    startedAt: Date | null = null,
    completedAt: Date | null = null,
    machineHoursSnapshot: Decimal | null = null,
    technicianId: string | null = null,
    providerId: string | null = null,
    cost: Decimal | null = null,
    currency: string = 'ARS',
    description: string | null = null,
    observations: string | null = null,
    tenantId: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    deletedAt: Date | null = null,
  ) {
    if (!machineId) throw new InvalidMaintenanceException('Machine ID is required');
    this.id = id;
    this.machineId = machineId;
    this.type = type;
    this.status = status;
    this.location = location;
    this.externalLocation = externalLocation;
    this.scheduledFor = scheduledFor;
    this.startedAt = startedAt;
    this.completedAt = completedAt;
    this.machineHoursSnapshot = machineHoursSnapshot;
    this.technicianId = technicianId;
    this.providerId = providerId;
    this.cost = cost;
    this.currency = currency;
    this.description = description;
    this.observations = observations;
    this.tenantId = tenantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  getId(): string { return this.id; }
  getMachineId(): string { return this.machineId; }
  getType(): MaintenanceType { return this.type; }
  getStatus(): MaintenanceStatus { return this.status; }
  getLocation(): MaintenanceLocation { return this.location; }
  getExternalLocation(): string | null { return this.externalLocation; }
  getScheduledFor(): Date | null { return this.scheduledFor; }
  getStartedAt(): Date | null { return this.startedAt; }
  getCompletedAt(): Date | null { return this.completedAt; }
  getMachineHoursSnapshot(): Decimal | null { return this.machineHoursSnapshot; }
  getTechnicianId(): string | null { return this.technicianId; }
  getProviderId(): string | null { return this.providerId; }
  getCost(): Decimal | null { return this.cost; }
  getCurrency(): string { return this.currency; }
  getDescription(): string | null { return this.description; }
  getObservations(): string | null { return this.observations; }
  getTenantId(): string | null { return this.tenantId; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }
  getDeletedAt(): Date | null { return this.deletedAt; }

  start(): void {
    if (this.status === MaintenanceStatus.IN_PROGRESS) return;
    this.status = MaintenanceStatus.IN_PROGRESS;
    this.startedAt = new Date();
    this.updatedAt = new Date();
  }

  complete(): void {
    if (this.status !== MaintenanceStatus.IN_PROGRESS) {
      throw new InvalidMaintenanceException('Can only complete orders in progress');
    }
    this.status = MaintenanceStatus.COMPLETED;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  changeStatus(newStatus: MaintenanceStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  assignTechnician(technicianId: string): void {
    this.technicianId = technicianId;
    this.updatedAt = new Date();
  }

  isCompleted(): boolean {
    return this.status === MaintenanceStatus.COMPLETED;
  }
}
