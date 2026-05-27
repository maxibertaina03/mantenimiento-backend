import { InvalidMaterialException } from '../exceptions/invalid-material.exception';
import { MaterialUnit } from '../value-objects/material-unit.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class Material {
  private id: string;
  private code: string;
  private name: string;
  private description: string | null;
  private unit: MaterialUnit;
  private stock: Decimal;
  private minStock: Decimal;
  private location: string | null;
  private tenantId: string | null;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    code: string,
    name: string,
    description: string | null = null,
    unit: MaterialUnit = MaterialUnit.UNIT,
    stock: Decimal = new Decimal(0),
    minStock: Decimal = new Decimal(0),
    location: string | null = null,
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
    this.unit = unit;
    this.stock = stock;
    this.minStock = minStock;
    this.location = location;
    this.tenantId = tenantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private validateCode(code: string): void {
    if (!code || code.trim().length === 0) throw new InvalidMaterialException('Material code cannot be empty');
    if (code.length > 50) throw new InvalidMaterialException('Material code cannot exceed 50 characters');
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) throw new InvalidMaterialException('Material name cannot be empty');
    if (name.length > 255) throw new InvalidMaterialException('Material name cannot exceed 255 characters');
  }

  getId(): string { return this.id; }
  getCode(): string { return this.code; }
  getName(): string { return this.name; }
  getDescription(): string | null { return this.description; }
  getUnit(): MaterialUnit { return this.unit; }
  getStock(): Decimal { return this.stock; }
  getMinStock(): Decimal { return this.minStock; }
  getLocation(): string | null { return this.location; }
  getTenantId(): string | null { return this.tenantId; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }
  getDeletedAt(): Date | null { return this.deletedAt; }

  addStock(quantity: Decimal): void {
    this.stock = this.stock.plus(quantity);
    this.updatedAt = new Date();
  }

  removeStock(quantity: Decimal): void {
    if (this.stock.lessThan(quantity)) throw new InvalidMaterialException('Insufficient stock');
    this.stock = this.stock.minus(quantity);
    this.updatedAt = new Date();
  }

  isBelowMinimum(): boolean {
    return this.stock.lessThan(this.minStock);
  }

  changeName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updatedAt = new Date();
  }

  updateLocation(location: string | null): void {
    this.location = location;
    this.updatedAt = new Date();
  }
}
