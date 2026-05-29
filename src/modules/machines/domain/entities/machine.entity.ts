import { InvalidMachineException } from '../exceptions/invalid-machine.exception';
import { MachineStatus } from '../value-objects/machine-status.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class Machine {
  private id: string;
  private code: string;
  private name: string;
  private brand: string | null;
  private model: string | null;
  private serialNumber: string | null;
  private status: MachineStatus;
  private usageHours: Decimal;
  private location: string | null;
  private responsibleId: string | null;
  private notes: string | null;
  private preventiveIntervalHours: Decimal | null;
  private lastPreventiveAtHours: Decimal | null;
  private tenantId: string | null;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    code: string,
    name: string,
    status: MachineStatus = MachineStatus.OPERATIONAL,
    usageHours: Decimal = new Decimal(0),
    brand: string | null = null,
    model: string | null = null,
    serialNumber: string | null = null,
    location: string | null = null,
    responsibleId: string | null = null,
    notes: string | null = null,
    preventiveIntervalHours: Decimal | null = null,
    lastPreventiveAtHours: Decimal | null = null,
    tenantId: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    deletedAt: Date | null = null,
  ) {
    this.validateCode(code);
    this.validateName(name);
    this.id = id;
    this.code = code;
    this.name = name;
    this.brand = brand;
    this.model = model;
    this.serialNumber = serialNumber;
    this.status = status;
    this.usageHours = usageHours;
    this.location = location;
    this.responsibleId = responsibleId;
    this.notes = notes;
    this.preventiveIntervalHours = preventiveIntervalHours;
    this.lastPreventiveAtHours = lastPreventiveAtHours;
    this.tenantId = tenantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private validateCode(code: string): void {
    if (!code || code.trim().length === 0) {
      throw new InvalidMachineException('Machine code cannot be empty');
    }
    if (code.length > 50) {
      throw new InvalidMachineException('Machine code cannot exceed 50 characters');
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new InvalidMachineException('Machine name cannot be empty');
    }
    if (name.length > 255) {
      throw new InvalidMachineException('Machine name cannot exceed 255 characters');
    }
  }

  getId(): string { return this.id; }
  getCode(): string { return this.code; }
  getName(): string { return this.name; }
  getBrand(): string | null { return this.brand; }
  getModel(): string | null { return this.model; }
  getSerialNumber(): string | null { return this.serialNumber; }
  getStatus(): MachineStatus { return this.status; }
  getUsageHours(): Decimal { return this.usageHours; }
  getLocation(): string | null { return this.location; }
  getResponsibleId(): string | null { return this.responsibleId; }
  getNotes(): string | null { return this.notes; }
  getPreventiveIntervalHours(): Decimal | null { return this.preventiveIntervalHours; }
  getLastPreventiveAtHours(): Decimal | null { return this.lastPreventiveAtHours; }
  getTenantId(): string | null { return this.tenantId; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }
  getDeletedAt(): Date | null { return this.deletedAt; }

  changeName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updatedAt = new Date();
  }

  updateLocation(location: string | null): void {
    this.location = location;
    this.updatedAt = new Date();
  }

  changeStatus(newStatus: MachineStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  logUsageHours(hours: Decimal): void {
    this.usageHours = this.usageHours.add(hours);
    this.updatedAt = new Date();
  }
}
