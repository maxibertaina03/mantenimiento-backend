import { Inject, Injectable } from '@nestjs/common';
import {
  TOOL_REPOSITORY,
  type ToolLoanRecord,
  type ToolRepository,
} from '../domain/tool.repository';

@Injectable()
export class ListLoansUseCase {
  constructor(@Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository) {}

  async execute(toolId: string, page = 1, pageSize = 20): Promise<ToolLoanRecord[]> {
    return this.tools.listLoans(toolId, (page - 1) * pageSize, pageSize);
  }
}
