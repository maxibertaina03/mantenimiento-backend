import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import type { AuditAction, Prisma } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

export interface AuditEntry {
  actorId?: string;
  action: AuditAction;
  entityType: string;
  entityId?: string;
  payload?: Prisma.InputJsonValue | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  requestId?: string | null;
  tenantId?: string | null;
}

/**
 * Punto de entrada único para escribir en `audit_logs`. Diseñado para:
 *  - Llamadas explícitas desde Use Cases (`auditWriter.write({...})`).
 *  - Llamadas implícitas desde `AuditInterceptor` (declarativo).
 *
 * Encapsula errores: si la auditoría falla, NO debe romper la operación principal
 * — se loggea y se sigue. (En producción esto idealmente va a una cola.)
 */
@Injectable()
export class AuditWriter {
  constructor(
    private readonly prisma: PrismaService,
    @InjectPinoLogger(AuditWriter.name) private readonly logger: PinoLogger,
  ) {}

  async write(entry: AuditEntry): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          actorId: entry.actorId ?? null,
          action: entry.action,
          entityType: entry.entityType,
          entityId: entry.entityId ?? null,
          payload: entry.payload ?? undefined,
          ipAddress: entry.ipAddress ?? null,
          userAgent: entry.userAgent ?? null,
          requestId: entry.requestId ?? null,
          tenantId: entry.tenantId ?? null,
        },
      });
    } catch (err) {
      this.logger.error({ err, entry }, 'Fallo escribiendo audit log');
    }
  }
}
