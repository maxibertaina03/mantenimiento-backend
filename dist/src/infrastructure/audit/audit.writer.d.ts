import type { AuditAction } from '@prisma/client';
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
export declare class AuditWriter {
    private readonly prisma;
    constructor(prisma: PrismaService);
    write(entry: AuditEntry): Promise<void>;
}
