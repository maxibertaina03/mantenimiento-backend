import { Injectable, Inject } from '@nestjs/common';
import { IToolRepository, TOOL_REPOSITORY } from '../../domain/repositories/tool.repository';
import { ToolNotFoundException } from '../../domain/exceptions/tool-not-found.exception';

@Injectable()
export class DeleteToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY)
    private readonly repository: IToolRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const tool = await this.repository.findById(id);
    if (!tool) throw new ToolNotFoundException(id);
    await this.repository.delete(id);
  }
}
