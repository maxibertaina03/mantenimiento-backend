import { SetMetadata } from '@nestjs/common';
import type { AuditAction } from '@prisma/client';

export const AUDITED_KEY = 'audited';

export interface AuditedMetadata {
  action: AuditAction;
  entity: string;
  /** Función para extraer el ID afectado del result/args. Opcional. */
  resolveEntityId?: (ctx: { args: unknown[]; result: unknown }) => string | undefined;
}

/**
 * Marca un handler para que `AuditInterceptor` persista una entrada en `audit_logs`
 * cuando se ejecute exitosamente.
 *
 *   @Audited({ action: 'CREATE', entity: 'Tool' })
 *   @Post()
 *   create(...) {}
 */
export const Audited = (meta: AuditedMetadata): MethodDecorator => SetMetadata(AUDITED_KEY, meta);
