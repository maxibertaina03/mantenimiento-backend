import { Module } from '@nestjs/common';

/**
 * TODO (Fase 2 - Audit query):
 *  - application/                     (ListAuditLogs con filtros: entityType, entityId, actorId, action, dateRange)
 *  - infrastructure/prisma-audit-log.repository.ts
 *  - presentation/audit-logs.controller.ts (read-only, restringido a ADMIN/SUPERVISOR)
 *
 * La ESCRITURA vive en `infrastructure/audit/audit.writer.ts` (transversal).
 * Este módulo expone únicamente las queries/lecturas hacia los clientes.
 */
@Module({})
export class AuditQueryModule {}
