import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import {
  TOOL_REPOSITORY,
  type ToolLoanRecord,
  type ToolRepository,
} from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';

export interface ToolDetail {
  tool: Tool;
  activeLoan: ToolLoanRecord | null;
}

@Injectable()
export class GetToolUseCase {
  constructor(@Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository) {}

  async execute(id: string): Promise<ToolDetail> {
    const tool = await this.tools.findById(id);
    if (!tool) throw new NotFoundError('Tool', id);
    const activeLoan = await this.tools.findActiveLoan(id);
    return { tool, activeLoan };
  }
}
