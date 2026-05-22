import { Prisma } from '@prisma/client';
import type { MaterialUnit, StockMovementType } from '@prisma/client';
import { InvariantError, ValidationError } from '@/common/exceptions/domain.exception';

const Decimal = Prisma.Decimal;
type Decimal = Prisma.Decimal;

export interface MovementInput {
  type: StockMovementType;
  /** Cantidad SIEMPRE positiva; el tipo define el signo aplicado al stock. */
  quantity: string;
  reason?: string | null;
  reference?: string | null;
}

export interface MovementApplied {
  type: StockMovementType;
  quantity: Decimal;
  /** Signo aplicado: +1 (INBOUND/ADJUSTMENT positivo) o -1 (OUTBOUND/CONSUMPTION/ADJUSTMENT negativo). */
  delta: Decimal;
  stockBefore: Decimal;
  stockAfter: Decimal;
}

/**
 * Entidad Material — agregado de stock + invariantes.
 *
 * Invariantes (en este orden de prioridad):
 *  1. `stock >= 0` SIEMPRE. Si un movimiento dejaría stock negativo, se rechaza.
 *  2. La cantidad de un movimiento es siempre > 0.
 *  3. Para `ADJUSTMENT` el caller debe pasar `quantity` y un campo opcional `signed = true|false`;
 *     en la firma actual aceptamos sólo positivos: para una corrección negativa se usa un
 *     movimiento `ADJUSTMENT` con flag específico — modelado vía método `adjustNegative`.
 */
export class Material {
  private constructor(
    public readonly id: string,
    public readonly code: string,
    private _name: string,
    private _description: string | null,
    private _unit: MaterialUnit,
    private _stock: Decimal,
    private _minStock: Decimal,
    private _location: string | null,
    public readonly tenantId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // --- getters ---------------------------------------------------------------
  get name(): string { return this._name; }
  get description(): string | null { return this._description; }
  get unit(): MaterialUnit { return this._unit; }
  get stock(): Decimal { return this._stock; }
  get minStock(): Decimal { return this._minStock; }
  get location(): string | null { return this._location; }

  get isLowStock(): boolean {
    return this._minStock.gt(0) && this._stock.lt(this._minStock);
  }

  // --- behavior --------------------------------------------------------------

  updateMetadata(input: {
    name?: string;
    description?: string | null;
    unit?: MaterialUnit;
    minStock?: string;
    location?: string | null;
  }): void {
    if (input.name !== undefined) {
      if (input.name.trim().length < 2) {
        throw new ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
      }
      this._name = input.name.trim();
    }
    if (input.description !== undefined) this._description = input.description;
    if (input.unit !== undefined) this._unit = input.unit;
    if (input.minStock !== undefined) {
      const next = new Decimal(input.minStock);
      if (next.lt(0)) {
        throw new ValidationError('INVALID_MIN_STOCK', 'El stock mínimo no puede ser negativo');
      }
      this._minStock = next;
    }
    if (input.location !== undefined) this._location = input.location;
  }

  /**
   * Aplica un movimiento de stock con la convención de signos del bounded context.
   * Devuelve la información necesaria para persistir el `StockMovement` (snapshot).
   */
  applyMovement(input: MovementInput): MovementApplied {
    const quantity = new Decimal(input.quantity);
    if (quantity.lte(0)) {
      throw new ValidationError(
        'INVALID_QUANTITY',
        'La cantidad debe ser mayor a cero',
      );
    }

    const stockBefore = this._stock;
    const delta = this.deltaFor(input.type, quantity);
    const stockAfter = stockBefore.add(delta);

    if (stockAfter.lt(0)) {
      throw new InvariantError(
        'INSUFFICIENT_STOCK',
        `Stock insuficiente: actual ${stockBefore.toString()}, requerido ${quantity.toString()}`,
      );
    }

    this._stock = stockAfter;
    return { type: input.type, quantity, delta, stockBefore, stockAfter };
  }

  /**
   * Ajuste explícito (positivo o negativo). Mantenemos la cantidad almacenada en
   * el movimiento siempre positiva y persistimos el signo en `delta`/`stockAfter`.
   */
  applyAdjustment(quantity: string, sign: 1 | -1, reason?: string | null): MovementApplied {
    const q = new Decimal(quantity);
    if (q.lte(0)) {
      throw new ValidationError('INVALID_QUANTITY', 'La cantidad debe ser mayor a cero');
    }
    const stockBefore = this._stock;
    const delta = sign === 1 ? q : q.negated();
    const stockAfter = stockBefore.add(delta);
    if (stockAfter.lt(0)) {
      throw new InvariantError(
        'INSUFFICIENT_STOCK',
        `Stock insuficiente: actual ${stockBefore.toString()}, requerido ${q.toString()}`,
      );
    }
    this._stock = stockAfter;
    void reason;
    return { type: 'ADJUSTMENT', quantity: q, delta, stockBefore, stockAfter };
  }

  private deltaFor(type: StockMovementType, quantity: Decimal): Decimal {
    switch (type) {
      case 'INBOUND':
      case 'ADJUSTMENT':
        return quantity;
      case 'OUTBOUND':
      case 'CONSUMPTION':
        return quantity.negated();
    }
  }

  // --- rehydrate -------------------------------------------------------------

  static rehydrate(props: {
    id: string;
    code: string;
    name: string;
    description: string | null;
    unit: MaterialUnit;
    stock: Decimal | string;
    minStock: Decimal | string;
    location: string | null;
    tenantId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Material {
    return new Material(
      props.id,
      props.code,
      props.name,
      props.description,
      props.unit,
      new Decimal(props.stock),
      new Decimal(props.minStock),
      props.location,
      props.tenantId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
