import { Module } from '@nestjs/common';

import { AuditLogsController } from './presentation/audit-logs.controller';
import { ListAuditLogsUseCase } from './application/list-audit-logs.use-case';

/**
 * Bounded context Audit (read side). La escritura vive en
 * `infrastructure/audit/audit.writer.ts` (transversal a todos los módulos).
 */
@Module({
  controllers: [AuditLogsController],
  providers: [ListAuditLogsUseCase],
})
export class AuditQueryModule {}
