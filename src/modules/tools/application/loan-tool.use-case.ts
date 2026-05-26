import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import {
  TOOL_REPOSITORY,
  type ToolLoanRecord,
  type ToolRepository,
} from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { LoanToolInput } from './dto/tool-input';

export interface LoanResult {
  tool: Tool;
  loan: ToolLoanRecord;
}

@Injectable()
export class LoanToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    toolId: string,
    input: LoanToolInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<LoanResult> {
    const tool = await this.tools.findById(toolId);
    if (!tool) throw new NotFoundError('Tool', toolId);

    const { from, to } = tool.loan();

    const loan = await this.tools.createLoanWithToolUpdate(tool, {
      toolId,
      responsibleId: input.responsibleId,
      expectedAt: input.expectedAt ? new Date(input.expectedAt) : null,
      notes: input.notes ?? null,
      tenantId,
    });

    await this.audit.write({
      actorId,
      action: 'STATE_CHANGE',
      entityType: 'Tool',
      entityId: tool.id,
      payload: {
        kind: 'LOAN',
        from,
        to,
        responsibleId: input.responsibleId,
        loanId: loan.id,
      },
      tenantId,
    });
    return { tool, loan };
  }
}
