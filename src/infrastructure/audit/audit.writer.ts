import { Injectable } from '@nestjs/common';
import type { AuditAction, Prisma } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

export interface AuditEntry {
  actorId?: string;
  action: AuditAction;
  entityType: string;
  entityId?: string;
  payload?: Record<string, unknown> | unknown | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  requestId?: string | null;
  tenantId?: string | null;
}

@Injectable()
export class AuditWriter {
  constructor(private readonly prisma: PrismaService) {}

  async write(entry: AuditEntry): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          actorId: entry.actorId ?? null,
          action: entry.action,
          entityType: entry.entityType,
          entityId: entry.entityId ?? null,
          payload: (entry.payload as Prisma.InputJsonValue) ?? undefined,
          ipAddress: entry.ipAddress ?? null,
          userAgent: entry.userAgent ?? null,
          requestId: entry.requestId ?? null,
          tenantId: entry.tenantId ?? null,
        },
      });
    } catch (err) {
      console.error('Error writing audit log:', err, entry);
    }
  }
}
