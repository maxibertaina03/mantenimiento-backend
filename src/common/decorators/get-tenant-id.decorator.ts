import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

interface AuthenticatedUser {
  tenantId: string | null;
}

export const GetTenantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;
    return user?.tenantId ?? null;
  },
);
