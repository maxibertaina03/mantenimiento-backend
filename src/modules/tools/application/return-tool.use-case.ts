import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import {
  TOOL_REPOSITORY,
  type ToolLoanRecord,
  type ToolRepository,
} from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';

export interface ReturnResult {
  tool: Tool;
  loan: ToolLoanRecord;
}

@Injectable()
export class ReturnToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(toolId: string, actorId: string, tenantId: string | null): Promise<ReturnResult> {
    const tool = await this.tools.findById(toolId);
    if (!tool) throw new NotFoundError('Tool', toolId);

    const { from, to } = tool.returnFromLoan();
    const loan = await this.tools.closeActiveLoan(tool, new Date());

    await this.audit.write({
      actorId,
      action: 'STATE_CHANGE',
      entityType: 'Tool',
      entityId: tool.id,
      payload: {
        kind: 'RETURN',
        from,
        to,
        loanId: loan.id,
      },
      tenantId,
    });
    return { tool, loan };
  }
}
