import type { AuditAction } from '@prisma/client';
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
export declare class ListAuditLogsUseCase {
    private readonly prisma;
    constructor(prisma: PrismaService);
    execute(input: ListAuditLogsInput): Promise<PaginatedAuditLogs>;
}
