import { Injectable } from '@nestjs/common';
import { UserRole, UserStatus } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { ClerkService } from './clerk.service';
import { ForbiddenError } from '@/common/exceptions/domain.exception';
import type { AuthenticatedUser } from '@/common/decorators/current-user.decorator';

/**
 * Reconciliación entre el usuario de Clerk y la tabla local `users`.
 *
 * - Si existe local: lo devuelve y valida estado (no `INACTIVE/SUSPENDED`).
 * - Si no existe: lo crea con rol por defecto `OPERATOR`.
 * - Mantiene email/nombre actualizados desde Clerk en cada login.
 */
@Injectable()
export class UserSyncService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerk: ClerkService,
  ) {}

  async ensureUser(clerkUserId: string): Promise<AuthenticatedUser> {
    const local = await this.prisma.user.findUnique({ where: { clerkUserId } });

    if (local) {
      if (local.status !== UserStatus.ACTIVE) {
        throw new ForbiddenError('USER_NOT_ACTIVE', `Usuario en estado ${local.status}`);
      }
      return this.toAuthenticated(local);
    }

    // Primera vez: traemos datos de Clerk y creamos/upserteamos por email.
    const snap = await this.clerk.getUser(clerkUserId);
    const created = await this.prisma.user.upsert({
      where: { email: snap.email },
      update: {
        clerkUserId,
        firstName: snap.firstName,
        lastName: snap.lastName,
        avatarUrl: snap.imageUrl,
      },
      create: {
        clerkUserId,
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

  private toAuthenticated(u: {
    id: string;
    clerkUserId: string;
    email: string;
    role: UserRole;
    tenantId: string | null;
  }): AuthenticatedUser {
    return {
      id: u.id,
      clerkUserId: u.clerkUserId,
      email: u.email,
      role: u.role,
      tenantId: u.tenantId,
    };
  }
}
