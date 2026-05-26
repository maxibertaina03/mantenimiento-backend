import type { ProviderServiceType } from '@prisma/client';
import { ValidationError } from '@/common/exceptions/domain.exception';

/**
 * Entidad Provider (Proveedor). Agregado simple: el "historial de trabajos" se
 * deriva del bounded context Maintenance y se consulta cross-context vía un
 * Public Service. No se duplica acá.
 */
export class Provider {
  private constructor(
    public readonly id: string,
    private _name: string,
    private _taxId: string | null,
    private _contactName: string | null,
    private _phone: string | null,
    private _email: string | null,
    private _address: string | null,
    private _serviceType: ProviderServiceType,
    private _notes: string | null,
    private _active: boolean,
    public readonly tenantId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  get name(): string { return this._name; }
  get taxId(): string | null { return this._taxId; }
  get contactName(): string | null { return this._contactName; }
  get phone(): string | null { return this._phone; }
  get email(): string | null { return this._email; }
  get address(): string | null { return this._address; }
  get serviceType(): ProviderServiceType { return this._serviceType; }
  get notes(): string | null { return this._notes; }
  get active(): boolean { return this._active; }

  updateMetadata(input: {
    name?: string;
    taxId?: string | null;
    contactName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    serviceType?: ProviderServiceType;
    notes?: string | null;
  }): void {
    if (input.name !== undefined) {
      if (input.name.trim().length < 2) {
        throw new ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
      }
      this._name = input.name.trim();
    }
    if (input.taxId !== undefined) this._taxId = input.taxId;
    if (input.contactName !== undefined) this._contactName = input.contactName;
    if (input.phone !== undefined) this._phone = input.phone;
    if (input.email !== undefined) this._email = input.email;
    if (input.address !== undefined) this._address = input.address;
    if (input.serviceType !== undefined) this._serviceType = input.serviceType;
    if (input.notes !== undefined) this._notes = input.notes;
  }

  activate(): void {
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  static rehydrate(props: {
    id: string;
    name: string;
    taxId: string | null;
    contactName: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    serviceType: ProviderServiceType;
    notes: string | null;
    active: boolean;
    tenantId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Provider {
    return new Provider(
      props.id,
      props.name,
      props.taxId,
      props.contactName,
      props.phone,
      props.email,
      props.address,
      props.serviceType,
      props.notes,
      props.active,
      props.tenantId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
