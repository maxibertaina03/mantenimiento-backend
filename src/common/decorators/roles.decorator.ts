import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Restringe acceso al endpoint/controller a los roles indicados.
 *
 *   @Roles('ADMIN', 'SUPERVISOR')
 *   @Post()
 *   create() {}
 */
export const Roles = (...roles: UserRole[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
