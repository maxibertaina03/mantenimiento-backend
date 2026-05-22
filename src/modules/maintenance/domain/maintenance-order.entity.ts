import { Prisma } from '@prisma/client';
import type {
  MaintenanceLocation,
  MaintenanceStatus,
  MaintenanceType,
} from '@prisma/client';
import { InvariantError, ValidationError } from '@/common/exceptions/domain.exception';

const Decimal = Prisma.Decimal;
type Decimal = Prisma.Decimal;

export interface CompleteInput {
  machineHoursSnapshot: string;
  cost?: string | null;
  currency?: string | null;
  observations?: string | null;
}

/**
 * Orden de mantenimiento. Agregado del bounded context Maintenance.
 *
 * Reglas de transición:
 *   SCHEDULED  → IN_PROGRESS, CANCELLED
 *   IN_PROGRESS → COMPLETED, CANCELLED
 *   COMPLETED  → (terminal)
 *   CANCELLED  → (terminal)
 */
export class MaintenanceOrder {
  private constructor(
    public readonly id: string,
    public readonly machineId: string,
    public readonly type: MaintenanceType,
    private _status: MaintenanceStatus,
    private _location: MaintenanceLocation,
    private _externalLocation: string | null,
    private _scheduledFor: Date | null,
    private _startedAt: Date | null,
    private _completedAt: Date | null,
    private _machineHoursSnapshot: Decimal | null,
    private _technicianId: string | null,
    private _providerId: string | null,
    private _cost: Decimal | null,
    private _currency: string | null,
    private _description: string | null,
    private _observations: string | null,
    public readonly tenantId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // --- getters ---------------------------------------------------------------
  get status(): MaintenanceStatus { return this._status; }
  get location(): MaintenanceLocation { return this._location; }
  get externalLocation(): string | null { return this._externalLocation; }
  get scheduledFor(): Date | null { return this._scheduledFor; }
  get startedAt(): Date | null { return this._startedAt; }
  get completedAt(): Date | null { return this._completedAt; }
  get machineHoursSnapshot(): Decimal | null { return this._machineHoursSnapshot; }
  get technicianId(): string | null { return this._technicianId; }
  get providerId(): string | null { return this._providerId; }
  get cost(): Decimal | null { return this._cost; }
  get currency(): string | null { return this._currency; }
  get description(): string | null { return this._description; }
  get observations(): string | null { return this._observations; }

  // --- behavior --------------------------------------------------------------

  start(at: Date = new Date()): { from: MaintenanceStatus; to: MaintenanceStatus } {
    if (this._status !== 'SCHEDULED') {
      throw new InvariantError(
        'INVALID_TRANSITION',
        `Sólo se puede iniciar un mantenimiento SCHEDULED (actual: ${this._status})`,
      );
    }
    this._status = 'IN_PROGRESS';
    this._startedAt = at;
    return { from: 'SCHEDULED', to: 'IN_PROGRESS' };
  }

  complete(input: CompleteInput, at: Date = new Date()):
    { from: MaintenanceStatus; to: MaintenanceStatus; hoursSnapshot: Decimal } {
    if (this._status !== 'SCHEDULED' && this._status !== 'IN_PROGRESS') {
      throw new InvariantError(
        'INVALID_TRANSITION',
        `Sólo se puede completar un mantenimiento SCHEDULED o IN_PROGRESS (actual: ${this._status})`,
      );
    }
    const snapshot = new Decimal(input.machineHoursSnapshot);
    if (snapshot.lt(0)) {
      throw new ValidationError('INVALID_HOURS', 'Las horas no pueden ser negativas');
    }
    const from = this._status;
    this._status = 'COMPLETED';
    if (!this._startedAt) this._startedAt = at;
    this._completedAt = at;
    this._machineHoursSnapshot = snapshot;
    if (input.cost !== undefined) {
      this._cost = input.cost === null ? null : new Decimal(input.cost);
    }
    if (input.currency !== undefined) this._currency = input.currency;
    if (input.observations !== undefined) this._observations = input.observations;
    return { from, to: 'COMPLETED', hoursSnapshot: snapshot };
  }

  cancel(reason?: string): { from: MaintenanceStatus; to: MaintenanceStatus } {
    if (this._status === 'COMPLETED' || this._status === 'CANCELLED') {
      throw new InvariantError(
        'INVALID_TRANSITION',
        `No se puede cancelar un mantenimiento ${this._status}`,
      );
    }
    const from = this._status;
    this._status = 'CANCELLED';
    if (reason) {
      this._observations = [this._observations, `[CANCELACIÓN] ${reason}`]
        .filter(Boolean)
        .join('\n');
    }
    return { from, to: 'CANCELLED' };
  }

  updateMetadata(input: {
    location?: MaintenanceLocation;
    externalLocation?: string | null;
    scheduledFor?: Date | null;
    technicianId?: string | null;
    providerId?: string | null;
    description?: string | null;
    observations?: string | null;
  }): void {
    if (this._status === 'COMPLETED' || this._status === 'CANCELLED') {
      throw new InvariantError('LOCKED', 'No se puede editar un mantenimiento finalizado');
    }
    if (input.location !== undefined) this._location = input.location;
    if (input.externalLocation !== undefined) this._externalLocation = input.externalLocation;
    if (input.scheduledFor !== undefined) this._scheduledFor = input.scheduledFor;
    if (input.technicianId !== undefined) this._technicianId = input.technicianId;
    if (input.providerId !== undefined) this._providerId = input.providerId;
    if (input.description !== undefined) this._description = input.description;
    if (input.observations !== undefined) this._observations = input.observations;
  }

  /**
   * El estado en que debe quedar la máquina según el estado actual del mantenimiento.
   * El caller en application decide si lo propaga (o lo deja al callback de Machine).
   */
  derivedMachineStatus():
    | 'INTERNAL_MAINTENANCE'
    | 'EXTERNAL_MAINTENANCE'
    | 'OPERATIONAL'
    | null {
    if (this._status === 'IN_PROGRESS') {
      return this._location === 'EXTERNAL' ? 'EXTERNAL_MAINTENANCE' : 'INTERNAL_MAINTENANCE';
    }
    if (this._status === 'COMPLETED' || this._status === 'CANCELLED') {
      return 'OPERATIONAL';
    }
    return null;
  }

  // --- rehydrate -------------------------------------------------------------

  static rehydrate(props: {
    id: string;
    machineId: string;
    type: MaintenanceType;
    status: MaintenanceStatus;
    location: MaintenanceLocation;
    externalLocation: string | null;
    scheduledFor: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    machineHoursSnapshot: Decimal | string | null;
    technicianId: string | null;
    providerId: string | null;
    cost: Decimal | string | null;
    currency: string | null;
    description: string | null;
    observations: string | null;
    tenantId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): MaintenanceOrder {
    return new MaintenanceOrder(
      props.id,
      props.machineId,
      props.type,
      props.status,
      props.location,
      props.externalLocation,
      props.scheduledFor,
      props.startedAt,
      props.completedAt,
      props.machineHoursSnapshot === null ? null : new Decimal(props.machineHoursSnapshot),
      props.technicianId,
      props.providerId,
      props.cost === null ? null : new Decimal(props.cost),
      props.currency,
      props.description,
      props.observations,
      props.tenantId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
