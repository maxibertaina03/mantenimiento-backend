import type { UserRole, UserStatus } from '@prisma/client';
import { InvariantError } from '@/common/exceptions/domain.exception';

/**
 * Entidad de dominio User. Pura: no conoce Prisma ni HTTP.
 * Encapsula invariantes que la base de datos sola no puede garantizar.
 *
 * `username` y `email` son ambos opcionales — al menos uno debe estar presente
 * (validado en infraestructura al sincronizar con Clerk).
 */
export class User {
  private constructor(
    public readonly id: string,
    public readonly clerkUserId: string,
    private _username: string | null,
    private _email: string | null,
    private _firstName: string | null,
    private _lastName: string | null,
    private _avatarUrl: string | null,
    private _role: UserRole,
    private _status: UserStatus,
    public readonly tenantId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  get username(): string | null {
    return this._username;
  }
  get email(): string | null {
    return this._email;
  }
  get firstName(): string | null {
    return this._firstName;
  }
  get lastName(): string | null {
    return this._lastName;
  }
  get avatarUrl(): string | null {
    return this._avatarUrl;
  }
  get role(): UserRole {
    return this._role;
  }
  get status(): UserStatus {
    return this._status;
  }

  /** Mejor representación legible: full name → username → email → fallback "Usuario". */
  get fullName(): string {
    const fromName = [this._firstName, this._lastName].filter(Boolean).join(' ').trim();
    return fromName || this._username || this._email || 'Usuario';
  }

  changeRole(role: UserRole): void {
    if (this._status !== 'ACTIVE') {
      throw new InvariantError(
        'USER_NOT_ACTIVE',
        'No se puede cambiar el rol de un usuario inactivo',
      );
    }
    this._role = role;
  }

  deactivate(): void {
    this._status = 'INACTIVE';
  }
  suspend(): void {
    this._status = 'SUSPENDED';
  }
  activate(): void {
    this._status = 'ACTIVE';
  }

  static rehydrate(props: {
    id: string;
    clerkUserId: string;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    role: UserRole;
    status: UserStatus;
    tenantId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      props.id,
      props.clerkUserId,
      props.username,
      props.email,
      props.firstName,
      props.lastName,
      props.avatarUrl,
      props.role,
      props.status,
      props.tenantId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
