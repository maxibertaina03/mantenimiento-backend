import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { UserRole } from '@prisma/client';

export interface AuthenticatedUser {
  /** ID interno de aplicación (tabla `users`) */
  id: string;
  /** ID en Clerk (tabla externa) */
  clerkUserId: string;
  email: string;
  role: UserRole;
  tenantId: string | null;
}

/**
 * Inyecta el usuario autenticado a partir del request (poblado por `ClerkAuthGuard`).
 *
 *   @Get('me')
 *   me(@CurrentUser() user: AuthenticatedUser) { ... }
 */
export const CurrentUser = createParamDecorator(
  (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;
    if (!user) return undefined;
    return data ? user[data] : user;
  },
);
