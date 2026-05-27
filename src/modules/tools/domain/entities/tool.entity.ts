import { InvalidToolException } from '../exceptions/invalid-tool.exception';
import { ToolStatus } from '../value-objects/tool-status.vo';

export class Tool {
  private id: string;
  private code: string;
  private name: string;
  private description: string | null;
  private brand: string | null;
  private model: string | null;
  private serialNumber: string | null;
  private status: ToolStatus;
  private location: string | null;
  private observations: string | null;
  private acquiredAt: Date | null;
  private tenantId: string | null;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    code: string,
    name: string,
    description: string | null = null,
    brand: string | null = null,
    model: string | null = null,
    serialNumber: string | null = null,
    status: ToolStatus = ToolStatus.AVAILABLE,
    location: string | null = null,
    observations: string | null = null,
    acquiredAt: Date | null = null,
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
    this.description = description;
    this.brand = brand;
    this.model = model;
    this.serialNumber = serialNumber;
    this.status = status;
    this.location = location;
    this.observations = observations;
    this.acquiredAt = acquiredAt;
    this.tenantId = tenantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private validateCode(code: string): void {
    if (!code || code.trim().length === 0) {
      throw new InvalidToolException('Tool code cannot be empty');
    }
    if (code.length > 50) {
      throw new InvalidToolException('Tool code cannot exceed 50 characters');
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new InvalidToolException('Tool name cannot be empty');
    }
    if (name.length > 255) {
      throw new InvalidToolException('Tool name cannot exceed 255 characters');
    }
  }

  getId(): string { return this.id; }
  getCode(): string { return this.code; }
  getName(): string { return this.name; }
  getDescription(): string | null { return this.description; }
  getBrand(): string | null { return this.brand; }
  getModel(): string | null { return this.model; }
  getSerialNumber(): string | null { return this.serialNumber; }
  getStatus(): ToolStatus { return this.status; }
  getLocation(): string | null { return this.location; }
  getObservations(): string | null { return this.observations; }
  getAcquiredAt(): Date | null { return this.acquiredAt; }
  getTenantId(): string | null { return this.tenantId; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }
  getDeletedAt(): Date | null { return this.deletedAt; }

  changeName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updatedAt = new Date();
  }

  changeStatus(newStatus: ToolStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  updateLocation(location: string | null): void {
    this.location = location;
    this.updatedAt = new Date();
  }

  addObservations(observations: string): void {
    this.observations = observations;
    this.updatedAt = new Date();
  }

  isAvailable(): boolean {
    return this.status === ToolStatus.AVAILABLE;
  }
}
