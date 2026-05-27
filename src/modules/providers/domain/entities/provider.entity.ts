import { InvalidProviderException } from '../exceptions/invalid-provider.exception';
import { ProviderStatus } from '../value-objects/provider-status.vo';

export class Provider {
  private id: string;
  private name: string;
  private email: string | null;
  private phone: string | null;
  private address: string | null;
  private city: string | null;
  private postalCode: string | null;
  private country: string | null;
  private taxId: string | null;
  private status: ProviderStatus;
  private tenantId: string | null;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string | null = null,
    phone: string | null = null,
    address: string | null = null,
    city: string | null = null,
    postalCode: string | null = null,
    country: string | null = null,
    taxId: string | null = null,
    status: ProviderStatus = ProviderStatus.ACTIVE,
    tenantId: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.validateName(name);
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.taxId = taxId;
    this.status = status;
    this.tenantId = tenantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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

  getEmail(): string | null {
    return this.email;
  }

  getPhone(): string | null {
    return this.phone;
  }

  getAddress(): string | null {
    return this.address;
  }

  getCity(): string | null {
    return this.city;
  }

  getPostalCode(): string | null {
    return this.postalCode;
  }

  getCountry(): string | null {
    return this.country;
  }

  getTaxId(): string | null {
    return this.taxId;
  }

  getStatus(): ProviderStatus {
    return this.status;
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

  changeName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updatedAt = new Date();
  }

  updateContactInfo(email?: string | null, phone?: string | null, address?: string | null): void {
    if (email !== undefined) this.email = email;
    if (phone !== undefined) this.phone = phone;
    if (address !== undefined) this.address = address;
    this.updatedAt = new Date();
  }

  updateLocation(city?: string | null, postalCode?: string | null, country?: string | null): void {
    if (city !== undefined) this.city = city;
    if (postalCode !== undefined) this.postalCode = postalCode;
    if (country !== undefined) this.country = country;
    this.updatedAt = new Date();
  }

  changeStatus(newStatus: ProviderStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.changeStatus(ProviderStatus.ACTIVE);
  }

  deactivate(): void {
    this.changeStatus(ProviderStatus.INACTIVE);
  }

  isActive(): boolean {
    return this.status === ProviderStatus.ACTIVE;
  }
}
