import { Injectable } from '@nestjs/common';
import { UserRole, UserStatus, type Prisma } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { ClerkService } from './clerk.service';
import { ForbiddenError, UnauthorizedError } from '@/common/exceptions/domain.exception';
import type { AuthenticatedUser } from '@/common/decorators/current-user.decorator';

type UserRow = {
  id: string;
  clerkUserId: string;
  username: string | null;
  email: string | null;
  role: UserRole;
  status: UserStatus;
  tenantId: string | null;
};

/**
 * Reconciliación entre el usuario de Clerk y la tabla local `users`.
 *
 * Estrategia de resolución (en este orden):
 *  1. `clerkUserId` exacto (caso esperado en logins recurrentes).
 *  2. `username` (permite reconciliar manualmente un row pre-creado, como
 *     el admin del seed, con un user de Clerk recién registrado).
 *  3. `email` (sólo si la instancia de Clerk lo expone).
 *
 * Si no se encuentra match, se crea con rol `OPERATOR` por defecto.
 */
@Injectable()
export class UserSyncService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerk: ClerkService,
  ) {}

  async ensureUser(clerkUserId: string): Promise<AuthenticatedUser> {
    const byClerkId = await this.prisma.user.findUnique({ where: { clerkUserId } });
    if (byClerkId) {
      this.assertActive(byClerkId);
      return this.toAuthenticated(byClerkId);
    }

    const snap = await this.clerk.getUser(clerkUserId);
    if (!snap.username && !snap.email) {
      throw new UnauthorizedError(
        'NO_IDENTIFIER',
        'El usuario de Clerk no tiene username ni email',
      );
    }

    // Intento de reconciliación por username/email (matchear rows pre-existentes).
    const existing = await this.findExistingMatch(snap.username, snap.email);
    if (existing) {
      this.assertActive(existing);
      const updated = await this.prisma.user.update({
        where: { id: existing.id },
        data: {
          clerkUserId,
          username: snap.username ?? existing.username,
          email: snap.email ?? existing.email,
          firstName: snap.firstName ?? existing.username, // fallback prolijo para UI
          lastName: undefined,
          avatarUrl: snap.imageUrl,
        },
      });
      return this.toAuthenticated(updated);
    }

    // Sin match: nuevo usuario con rol OPERATOR.
    const created = await this.prisma.user.create({
      data: {
        clerkUserId,
        username: snap.username,
        email: snap.email,
        firstName: snap.firstName,
        lastName: snap.lastName,
        avatarUrl: snap.imageUrl,
        role: UserRole.OPERATOR,
        status: UserStatus.ACTIVE,
      },
    });
    return this.toAuthenticated(created);
  }

  private async findExistingMatch(
    username: string | null,
    email: string | null,
  ): Promise<UserRow | null> {
    const ors: Prisma.UserWhereInput[] = [];
    if (username) ors.push({ username });
    if (email) ors.push({ email });
    if (ors.length === 0) return null;
    return this.prisma.user.findFirst({ where: { OR: ors } });
  }

  private assertActive(u: UserRow): void {
    if (u.status !== UserStatus.ACTIVE) {
      throw new ForbiddenError('USER_NOT_ACTIVE', `Usuario en estado ${u.status}`);
    }
  }

  private toAuthenticated(u: UserRow): AuthenticatedUser {
    return {
      id: u.id,
      clerkUserId: u.clerkUserId,
      username: u.username,
      email: u.email,
      role: u.role,
      tenantId: u.tenantId,
    };
  }
}
