import { Injectable, Inject } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { Tool } from '../../../domain/entities/tool.entity';
import { IToolRepository, TOOL_REPOSITORY } from '../../../domain/repositories/tool.repository';
import { ToolStatus } from '../../../domain/value-objects/tool-status.vo';
import { InvalidToolException } from '../../../domain/exceptions/invalid-tool.exception';
import { CreateToolInput } from '../../dtos/create-tool.input';
import { CreateToolOutput } from '../../dtos/create-tool.output';
import { ToolAppMapper } from '../../mappers/tool-app.mapper';

@Injectable()
export class CreateToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY)
    private readonly repository: IToolRepository,
  ) {}

  async execute(input: CreateToolInput): Promise<CreateToolOutput> {
    const tool = new Tool(
      generateUUID(),
      input.code,
      input.name,
      input.description ?? null,
      input.brand ?? null,
      input.model ?? null,
      input.serialNumber ?? null,
      input.status ?? ToolStatus.AVAILABLE,
      input.location ?? null,
      input.observations ?? null,
      input.acquiredAt ?? null,
      null,
    );

    const existingTool = await this.repository.findByCode(tool.getCode());
    if (existingTool) {
      throw new InvalidToolException(`Tool with code "${tool.getCode()}" already exists`);
    }

    await this.repository.save(tool);
    return ToolAppMapper.toOutput(tool);
  }
}
