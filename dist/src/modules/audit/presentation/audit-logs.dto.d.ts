import { AuditAction } from '@prisma/client';
import type { AuditLogRecord } from '../application/list-audit-logs.use-case';
export declare class ListAuditLogsQueryDto {
    page?: number;
    pageSize?: number;
    entityType?: string;
    entityId?: string;
    actorId?: string;
    action?: AuditAction;
    from?: string;
    to?: string;
}
export declare class AuditLogResponseDto {
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
    createdAt: string;
    static from(r: AuditLogRecord): AuditLogResponseDto;
}
export declare class PaginatedAuditLogsResponseDto {
    items: AuditLogResponseDto[];
    total: number;
    page: number;
    pageSize: number;
}
