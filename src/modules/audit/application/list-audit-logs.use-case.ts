import { Injectable } from '@nestjs/common';
import type { AuditAction, Prisma } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

export interface ListAuditLogsInput {
  page?: number;
  pageSize?: number;
  entityType?: string;
  entityId?: string;
  actorId?: string;
  action?: AuditAction;
  from?: string;
  to?: string;
  tenantId?: string | null;
}

export interface AuditLogRecord {
  id: string;
  actorId: string | null;
  action: AuditAction;
  entityType: string;
  entityId: string | null;
  payload: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  requestId: string | null;
  tenantId: string | null;
  createdAt: Date;
}

export interface PaginatedAuditLogs {
  items: AuditLogRecord[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Lectura paginada de la tabla de auditoría. Se consulta directo a Prisma
 * (no necesita un repository propio: es una read model trivial).
 */
@Injectable()
export class ListAuditLogsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: ListAuditLogsInput): Promise<PaginatedAuditLogs> {
    const page = Math.max(1, input.page ?? 1);
    const pageSize = Math.min(200, Math.max(1, input.pageSize ?? 50));

    const where: Prisma.AuditLogWhereInput = {
      ...(input.entityType ? { entityType: input.entityType } : {}),
      ...(input.entityId ? { entityId: input.entityId } : {}),
      ...(input.actorId ? { actorId: input.actorId } : {}),
      ...(input.action ? { action: input.action } : {}),
      ...(input.tenantId !== undefined ? { tenantId: input.tenantId } : {}),
      ...(input.from || input.to
        ? {
            createdAt: {
              ...(input.from ? { gte: new Date(input.from) } : {}),
              ...(input.to ? { lte: new Date(input.to) } : {}),
            },
          }
        : {}),
    };

    const [rows, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { items: rows, total, page, pageSize };
  }
}
