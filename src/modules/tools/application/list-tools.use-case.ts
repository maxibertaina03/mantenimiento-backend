import { Inject, Injectable } from '@nestjs/common';
import { TOOL_REPOSITORY, type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { ListToolsInput } from './dto/tool-input';

export interface PaginatedTools {
  items: Tool[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListToolsUseCase {
  constructor(@Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository) {}

  async execute(input: ListToolsInput): Promise<PaginatedTools> {
    const page = Math.max(1, input.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, input.pageSize ?? 20));
    const { items, total } = await this.tools.list({
      skip: (page - 1) * pageSize,
      take: pageSize,
      status: input.status,
      search: input.search?.trim() || undefined,
    });
    return { items, total, page, pageSize };
  }
}
