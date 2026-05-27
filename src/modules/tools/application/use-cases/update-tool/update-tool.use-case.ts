import { Injectable, Inject } from '@nestjs/common';
import { IToolRepository, TOOL_REPOSITORY } from '../../domain/repositories/tool.repository';
import { ToolNotFoundException } from '../../domain/exceptions/tool-not-found.exception';
import { CreateToolOutput } from '../dtos/create-tool.output';
import { ToolAppMapper } from '../mappers/tool-app.mapper';

export class UpdateToolInput {
  id!: string;
  name?: string;
  location?: string | null;
}

@Injectable()
export class UpdateToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY)
    private readonly repository: IToolRepository,
  ) {}

  async execute(input: UpdateToolInput): Promise<CreateToolOutput> {
    const tool = await this.repository.findById(input.id);
    if (!tool) throw new ToolNotFoundException(input.id);

    if (input.name) tool.changeName(input.name);
    if (input.location !== undefined) tool.updateLocation(input.location);

    await this.repository.save(tool);
    return ToolAppMapper.toOutput(tool);
  }
}
