import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClerkClient, verifyToken, type ClerkClient } from '@clerk/backend';
import { appConfig } from '@/config';
import { UnauthorizedError } from '@/common/exceptions/domain.exception';

export interface ClerkSession {
  userId: string;
  sessionId: string;
}

export interface ClerkUserSnapshot {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}

/**
 * Wrapper sobre `@clerk/backend` para verificación de tokens y lectura de usuario.
 * No persiste nada: la sincronización con la tabla local vive en `UserSyncService`.
 */
@Injectable()
export class ClerkService {
  private readonly client: ClerkClient;
  private readonly secretKey: string;
  private readonly issuer?: string;

  constructor(cs: ConfigService) {
    const cfg = appConfig(cs);
    this.secretKey = cfg.clerk.secretKey;
    this.issuer = cfg.clerk.jwtIssuer;
    this.client = createClerkClient({
      secretKey: cfg.clerk.secretKey,
      publishableKey: cfg.clerk.publishableKey,
    });
  }

  async verifyToken(token: string): Promise<ClerkSession> {
    try {
      const payload = await verifyToken(token, {
        secretKey: this.secretKey,
        ...(this.issuer ? { issuer: this.issuer } : {}),
      });
      if (!payload.sub) throw new Error('Token sin subject');
      return { userId: payload.sub, sessionId: payload.sid ?? '' };
    } catch (err) {
      throw new UnauthorizedError(
        'INVALID_TOKEN',
        err instanceof Error ? err.message : 'Token inválido',
      );
    }
  }

  async getUser(clerkUserId: string): Promise<ClerkUserSnapshot> {
    const u = await this.client.users.getUser(clerkUserId);
    const email =
      u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress ??
      u.emailAddresses[0]?.emailAddress;
    if (!email) {
      throw new UnauthorizedError('NO_EMAIL', 'El usuario de Clerk no tiene email');
    }
    return {
      id: u.id,
      email,
      firstName: u.firstName,
      lastName: u.lastName,
      imageUrl: u.imageUrl,
    };
  }
}
