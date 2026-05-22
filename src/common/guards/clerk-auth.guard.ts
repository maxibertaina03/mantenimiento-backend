import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UnauthorizedError } from '../exceptions/domain.exception';
import { ClerkService } from '@/infrastructure/clerk/clerk.service';
import { UserSyncService } from '@/infrastructure/clerk/user-sync.service';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

/**
 * Verifica el JWT de Clerk del header `Authorization: Bearer ...`,
 * reconcilia el usuario en la tabla local y deja `req.user` poblado.
 */
@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly clerk: ClerkService,
    private readonly userSync: UserSyncService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request & { user?: AuthenticatedUser }>();
    const token = this.extractBearer(req);
    if (!token) throw new UnauthorizedError('MISSING_TOKEN', 'Falta token de autenticación');

    const session = await this.clerk.verifyToken(token);
    const user = await this.userSync.ensureUser(session.userId);

    req.user = user;
    return true;
  }

  private extractBearer(req: Request): string | null {
    const header = req.headers.authorization;
    if (!header || typeof header !== 'string') return null;
    const [scheme, token] = header.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
    return token;
  }
}
