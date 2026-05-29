import { Injectable, Inject } from '@nestjs/common';
import { IToolRepository, TOOL_REPOSITORY } from '../../../domain/repositories/tool.repository';
import { ListToolsInput } from '../../dtos/list-tools.input';
import { ListToolsOutput, ToolListItemDto } from '../../dtos/list-tools.output';

@Injectable()
export class ListToolsUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY)
    private readonly repository: IToolRepository,
  ) {}

  async execute(input: ListToolsInput): Promise<ListToolsOutput> {
    const tools = await this.repository.findAll(input.tenantId);

    const start = ((input.page ?? 1) - 1) * (input.pageSize ?? 10);
    const end = start + (input.pageSize ?? 10);
    const paginatedTools = tools.slice(start, end);

    const items: ToolListItemDto[] = paginatedTools.map((t) => ({
      id: t.getId(),
      code: t.getCode(),
      name: t.getName(),
      brand: t.getBrand(),
      model: t.getModel(),
      status: t.getStatus(),
      location: t.getLocation(),
      createdAt: t.getCreatedAt(),
    }));

    return {
      items,
      total: tools.length,
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 10,
    };
  }
}
