import { Module } from '@nestjs/common';

/**
 * TODO (Fase 2 - Tools):
 *  - domain/tool.entity.ts                 (estados: AVAILABLE/ON_LOAN/IN_REPAIR/OUT_OF_SERVICE)
 *  - domain/tool-loan.entity.ts            (historial de préstamos)
 *  - domain/tool.repository.ts             (puerto)
 *  - application/                          (RegisterTool, LoanTool, ReturnTool, ChangeStatus, ListTools)
 *  - infrastructure/prisma-tool.repository.ts
 *  - presentation/tools.controller.ts
 */
@Module({})
export class ToolsModule {}
