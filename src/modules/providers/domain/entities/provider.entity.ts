import { InvalidProviderException } from '../exceptions/invalid-provider.exception';
import { ProviderServiceType } from '../value-objects/provider-service-type.vo';

export class Provider {
  private id: string;
  private name: string;
  private taxId: string | null;
  private contactName: string | null;
  private phone: string | null;
  private email: string | null;
  private address: string | null;
  private serviceType: ProviderServiceType;
  private notes: string | null;
  private active: boolean;
  private tenantId: string | null;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    name: string,
    taxId: string | null = null,
    contactName: string | null = null,
    phone: string | null = null,
    email: string | null = null,
    address: string | null = null,
    serviceType: ProviderServiceType = ProviderServiceType.MAINTENANCE,
    notes: string | null = null,
    active: boolean = true,
    tenantId: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    deletedAt: Date | null = null,
  ) {
    this.validateName(name);
    this.id = id;
    this.name = name;
    this.taxId = taxId;
    this.contactName = contactName;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.serviceType = serviceType;
    this.notes = notes;
    this.active = active;
    this.tenantId = tenantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new InvalidProviderException('Provider name cannot be empty');
    }
    if (name.length > 255) {
      throw new InvalidProviderException('Provider name cannot exceed 255 characters');
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getTaxId(): string | null {
    return this.taxId;
  }

  getContactName(): string | null {
    return this.contactName;
  }

  getPhone(): string | null {
    return this.phone;
  }

  getEmail(): string | null {
    return this.email;
  }

  getAddress(): string | null {
    return this.address;
  }

  getServiceType(): ProviderServiceType {
    return this.serviceType;
  }

  getNotes(): string | null {
    return this.notes;
  }

  isActive(): boolean {
    return this.active;
  }

  getTenantId(): string | null {
    return this.tenantId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  changeName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updatedAt = new Date();
  }

  updateContactInfo(contactName?: string | null, phone?: string | null, email?: string | null, address?: string | null): void {
    if (contactName !== undefined) this.contactName = contactName;
    if (phone !== undefined) this.phone = phone;
    if (email !== undefined) this.email = email;
    if (address !== undefined) this.address = address;
    this.updatedAt = new Date();
  }

  changeServiceType(serviceType: ProviderServiceType): void {
    this.serviceType = serviceType;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.active = true;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.active = false;
    this.updatedAt = new Date();
  }

  addNotes(notes: string): void {
    this.notes = notes;
    this.updatedAt = new Date();
  }
}
