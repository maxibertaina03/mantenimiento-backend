import { Injectable, Inject } from '@nestjs/common';
import { IToolRepository, TOOL_REPOSITORY } from '../../../domain/repositories/tool.repository';
import { ToolAppMapper } from '../../mappers/tool-app.mapper';
import { ListToolsInput } from '../../dtos/list-tools.input';
import type { CreateToolOutput } from '../../dtos/create-tool.output';

export interface ListToolsOutput {
  items: CreateToolOutput[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListToolsUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY)
    private readonly repository: IToolRepository,
  ) {}

  async execute(input: ListToolsInput): Promise<ListToolsOutput> {
    const tools = await this.repository.findAll(input.tenantId);

    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedTools = tools.slice(start, end);

    const items = paginatedTools.map((t) => ToolAppMapper.toOutput(t));

    return {
      items,
      total: tools.length,
      page,
      pageSize,
    };
  }
}
