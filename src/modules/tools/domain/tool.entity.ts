import type { ToolStatus } from '@prisma/client';
import { InvariantError, ValidationError } from '@/common/exceptions/domain.exception';

/**
 * Entidad Tool (herramienta con identidad individual; sin stock numérico).
 *
 * Invariantes:
 *  - El estado y los préstamos están acoplados: una herramienta con préstamo activo
 *    DEBE estar en estado `ON_LOAN`. Esa coherencia la garantizan los use cases.
 *  - Las transiciones de estado están restringidas por método (no setear status libremente).
 */
export class Tool {
  private constructor(
    public readonly id: string,
    public readonly code: string,
    private _name: string,
    private _description: string | null,
    private _brand: string | null,
    private _model: string | null,
    private _serialNumber: string | null,
    private _status: ToolStatus,
    private _location: string | null,
    private _observations: string | null,
    private _acquiredAt: Date | null,
    public readonly tenantId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  get name(): string { return this._name; }
  get description(): string | null { return this._description; }
  get brand(): string | null { return this._brand; }
  get model(): string | null { return this._model; }
  get serialNumber(): string | null { return this._serialNumber; }
  get status(): ToolStatus { return this._status; }
  get location(): string | null { return this._location; }
  get observations(): string | null { return this._observations; }
  get acquiredAt(): Date | null { return this._acquiredAt; }

  updateMetadata(input: {
    name?: string;
    description?: string | null;
    brand?: string | null;
    model?: string | null;
    serialNumber?: string | null;
    location?: string | null;
    observations?: string | null;
    acquiredAt?: Date | null;
  }): void {
    if (input.name !== undefined) {
      if (input.name.trim().length < 2) {
        throw new ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
      }
      this._name = input.name.trim();
    }
    if (input.description !== undefined) this._description = input.description;
    if (input.brand !== undefined) this._brand = input.brand;
    if (input.model !== undefined) this._model = input.model;
    if (input.serialNumber !== undefined) this._serialNumber = input.serialNumber;
    if (input.location !== undefined) this._location = input.location;
    if (input.observations !== undefined) this._observations = input.observations;
    if (input.acquiredAt !== undefined) this._acquiredAt = input.acquiredAt;
  }

  /**
   * Marca la herramienta como prestada. Sólo puede pasarse a ON_LOAN desde AVAILABLE.
   */
  loan(): { from: ToolStatus; to: ToolStatus } {
    if (this._status !== 'AVAILABLE') {
      throw new InvariantError(
        'NOT_AVAILABLE',
        `Sólo se puede prestar una herramienta disponible (actual: ${this._status})`,
      );
    }
    const from = this._status;
    this._status = 'ON_LOAN';
    return { from, to: this._status };
  }

  /** Devuelve la herramienta tras un préstamo. */
  returnFromLoan(): { from: ToolStatus; to: ToolStatus } {
    if (this._status !== 'ON_LOAN') {
      throw new InvariantError(
        'NOT_ON_LOAN',
        `La herramienta no está prestada (actual: ${this._status})`,
      );
    }
    const from = this._status;
    this._status = 'AVAILABLE';
    return { from, to: this._status };
  }

  /**
   * Cambia el estado a IN_REPAIR / OUT_OF_SERVICE / AVAILABLE (no ON_LOAN — eso pasa por loan()).
   * No se puede entrar a ON_LOAN ni salir de él por este método.
   */
  changeAdministrativeStatus(next: ToolStatus): { from: ToolStatus; to: ToolStatus } {
    if (next === 'ON_LOAN') {
      throw new InvariantError(
        'INVALID_TRANSITION',
        'Para prestar una herramienta usar el flujo de préstamo',
      );
    }
    if (this._status === 'ON_LOAN') {
      throw new InvariantError(
        'TOOL_ON_LOAN',
        'La herramienta tiene un préstamo activo: devuelva primero',
      );
    }
    if (this._status === next) {
      throw new InvariantError('SAME_STATUS', `La herramienta ya está en estado ${next}`);
    }
    const from = this._status;
    this._status = next;
    return { from, to: next };
  }

  static rehydrate(props: {
    id: string;
    code: string;
    name: string;
    description: string | null;
    brand: string | null;
    model: string | null;
    serialNumber: string | null;
    status: ToolStatus;
    location: string | null;
    observations: string | null;
    acquiredAt: Date | null;
    tenantId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Tool {
    return new Tool(
      props.id,
      props.code,
      props.name,
      props.description,
      props.brand,
      props.model,
      props.serialNumber,
      props.status,
      props.location,
      props.observations,
      props.acquiredAt,
      props.tenantId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
