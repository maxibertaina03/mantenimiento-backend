import { Prisma } from '@prisma/client';
import type { MachineStatus } from '@prisma/client';
import { InvariantError, ValidationError } from '@/common/exceptions/domain.exception';

const Decimal = Prisma.Decimal;
type Decimal = Prisma.Decimal;

export interface PreventivePlan {
  /** Intervalo en horas entre mantenimientos preventivos. `null` desactiva alertas. */
  intervalHours: Decimal | null;
  /** Horas de uso registradas en el último mantenimiento preventivo completado. */
  lastDoneAtHours: Decimal | null;
}

/**
 * Entidad de dominio Machine.
 *
 * Invariantes:
 *  - `usageHours` es monótona creciente (no se puede "bajar" salvo por ajuste explícito, no soportado aún).
 *  - El delta de horas registrado debe ser > 0.
 *  - `preventiveIntervalHours` debe ser > 0 si se setea.
 */
export class Machine {
  private constructor(
    public readonly id: string,
    public readonly code: string,
    private _name: string,
    private _brand: string | null,
    private _model: string | null,
    private _serialNumber: string | null,
    private _status: MachineStatus,
    private _usageHours: Decimal,
    private _location: string | null,
    private _responsibleId: string | null,
    private _notes: string | null,
    private _preventive: PreventivePlan,
    public readonly tenantId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // --- getters ---------------------------------------------------------------
  get name(): string { return this._name; }
  get brand(): string | null { return this._brand; }
  get model(): string | null { return this._model; }
  get serialNumber(): string | null { return this._serialNumber; }
  get status(): MachineStatus { return this._status; }
  get usageHours(): Decimal { return this._usageHours; }
  get location(): string | null { return this._location; }
  get responsibleId(): string | null { return this._responsibleId; }
  get notes(): string | null { return this._notes; }
  get preventive(): PreventivePlan { return this._preventive; }

  // --- behaviour -------------------------------------------------------------

  rename(name: string): void {
    if (name.trim().length < 2) {
      throw new ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
    }
    this._name = name.trim();
  }

  updateMetadata(input: {
    brand?: string | null;
    model?: string | null;
    serialNumber?: string | null;
    location?: string | null;
    responsibleId?: string | null;
    notes?: string | null;
    preventiveIntervalHours?: string | null;
  }): void {
    if (input.brand !== undefined) this._brand = input.brand;
    if (input.model !== undefined) this._model = input.model;
    if (input.serialNumber !== undefined) this._serialNumber = input.serialNumber;
    if (input.location !== undefined) this._location = input.location;
    if (input.responsibleId !== undefined) this._responsibleId = input.responsibleId;
    if (input.notes !== undefined) this._notes = input.notes;
    if (input.preventiveIntervalHours !== undefined) {
      const next = input.preventiveIntervalHours === null
        ? null
        : new Decimal(input.preventiveIntervalHours);
      if (next !== null && next.lte(0)) {
        throw new ValidationError(
          'INVALID_INTERVAL',
          'El intervalo preventivo debe ser mayor a cero',
        );
      }
      this._preventive = { ...this._preventive, intervalHours: next };
    }
  }

  changeStatus(next: MachineStatus): { from: MachineStatus; to: MachineStatus } {
    if (this._status === next) {
      throw new InvariantError('SAME_STATUS', `La máquina ya está en estado ${next}`);
    }
    const from = this._status;
    this._status = next;
    return { from, to: next };
  }

  /**
   * Registra horas de uso. Retorna delta para que el caller persista el `MachineUsageLog`.
   */
  logUsageHours(input: { hoursAfter: string }): { hoursBefore: Decimal; hoursAfter: Decimal; delta: Decimal } {
    const hoursAfter = new Decimal(input.hoursAfter);
    if (hoursAfter.lte(this._usageHours)) {
      throw new InvariantError(
        'HOURS_NOT_INCREASING',
        `Las horas deben ser mayores a las actuales (${this._usageHours.toString()})`,
      );
    }
    const delta = hoursAfter.sub(this._usageHours);
    const hoursBefore = this._usageHours;
    this._usageHours = hoursAfter;
    return { hoursBefore, hoursAfter, delta };
  }

  /**
   * Marca un mantenimiento preventivo como completado en el contador.
   * Llamado por el bounded context Maintenance via PublicInterface.
   */
  markPreventiveCompleted(atHours: string): void {
    const at = new Decimal(atHours);
    this._preventive = { ...this._preventive, lastDoneAtHours: at };
  }

  /**
   * Devuelve true si la máquina superó el umbral para mantenimiento preventivo.
   * Función pura: el caller decide qué hacer (alerta, schedule auto, etc).
   */
  isPreventiveDue(): boolean {
    const interval = this._preventive.intervalHours;
    if (interval === null || interval.lte(0)) return false;
    const lastDone = this._preventive.lastDoneAtHours ?? new Decimal(0);
    return this._usageHours.sub(lastDone).gte(interval);
  }

  /** Horas restantes para el próximo preventivo (negativo si ya está vencido). */
  hoursUntilPreventive(): Decimal | null {
    const interval = this._preventive.intervalHours;
    if (interval === null || interval.lte(0)) return null;
    const lastDone = this._preventive.lastDoneAtHours ?? new Decimal(0);
    return lastDone.add(interval).sub(this._usageHours);
  }

  // --- rehydration -----------------------------------------------------------

  static rehydrate(props: {
    id: string;
    code: string;
    name: string;
    brand: string | null;
    model: string | null;
    serialNumber: string | null;
    status: MachineStatus;
    usageHours: Decimal | string;
    location: string | null;
    responsibleId: string | null;
    notes: string | null;
    preventiveIntervalHours: Decimal | string | null;
    lastPreventiveAtHours: Decimal | string | null;
    tenantId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Machine {
    return new Machine(
      props.id,
      props.code,
      props.name,
      props.brand,
      props.model,
      props.serialNumber,
      props.status,
      new Decimal(props.usageHours),
      props.location,
      props.responsibleId,
      props.notes,
      {
        intervalHours: props.preventiveIntervalHours === null
          ? null
          : new Decimal(props.preventiveIntervalHours),
        lastDoneAtHours: props.lastPreventiveAtHours === null
          ? null
          : new Decimal(props.lastPreventiveAtHours),
      },
      props.tenantId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
