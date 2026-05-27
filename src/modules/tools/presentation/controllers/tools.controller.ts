import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateToolUseCase } from '../../application/use-cases/create-tool/create-tool.use-case';
import { CreateToolRequestDto } from '../dtos/create-tool.request.dto';
import { ToolResponseDto } from '../dtos/tool.response.dto';
import { ToolPresenterMapper } from '../mappers/tool-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';

@Controller('tools')
@UseGuards(ClerkAuthGuard)
export class ToolsController {
  constructor(private readonly createTool: CreateToolUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateToolRequestDto): Promise<ToolResponseDto> {
    const output = await this.createTool.execute({
      code: dto.code.toUpperCase(),
      name: dto.name,
      description: dto.description ?? null,
      brand: dto.brand ?? null,
      model: dto.model ?? null,
      serialNumber: dto.serialNumber ?? null,
      status: dto.status,
      location: dto.location ?? null,
      observations: dto.observations ?? null,
      acquiredAt: dto.acquiredAt ?? null,
    });
    return ToolPresenterMapper.toResponse(output);
  }
}
