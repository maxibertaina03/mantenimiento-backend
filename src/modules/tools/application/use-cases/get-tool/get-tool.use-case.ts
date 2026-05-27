import { Injectable, Inject } from '@nestjs/common';
import { IToolRepository, TOOL_REPOSITORY } from '../../domain/repositories/tool.repository';
import { ToolNotFoundException } from '../../domain/exceptions/tool-not-found.exception';
import { CreateToolOutput } from '../dtos/create-tool.output';
import { ToolAppMapper } from '../mappers/tool-app.mapper';

@Injectable()
export class GetToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY)
    private readonly repository: IToolRepository,
  ) {}

  async execute(id: string): Promise<CreateToolOutput> {
    const tool = await this.repository.findById(id);
    if (!tool) throw new ToolNotFoundException(id);
    return ToolAppMapper.toOutput(tool);
  }
}
