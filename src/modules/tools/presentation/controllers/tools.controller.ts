import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import { CreateToolUseCase } from '../../application/use-cases/create-tool/create-tool.use-case';
import { ListToolsUseCase } from '../../application/use-cases/list-tools/list-tools.use-case';
import { GetToolUseCase } from '../../application/use-cases/get-tool/get-tool.use-case';
import { UpdateToolUseCase } from '../../application/use-cases/update-tool/update-tool.use-case';
import { DeleteToolUseCase } from '../../application/use-cases/delete-tool/delete-tool.use-case';
import { CreateToolRequestDto } from '../dtos/create-tool.request.dto';
import { UpdateToolRequestDto } from '../dtos/update-tool.request.dto';
import { ToolResponseDto } from '../dtos/tool.response.dto';
import { ToolPresenterMapper } from '../mappers/tool-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';
import { GetTenantId } from '../../../../common/decorators/get-tenant-id.decorator';

@Controller('tools')
@UseGuards(ClerkAuthGuard)
export class ToolsController {
  constructor(
    private readonly createTool: CreateToolUseCase,
    private readonly listTools: ListToolsUseCase,
    private readonly getTool: GetToolUseCase,
    private readonly updateTool: UpdateToolUseCase,
    private readonly deleteTool: DeleteToolUseCase,
  ) {}

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

  @Get()
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const output = await this.listTools.execute({
      tenantId,
      page,
      pageSize,
    });
    return {
      items: output.items.map((item) => ToolPresenterMapper.toResponse(item as any)),
      total: output.total,
      page: output.page,
      pageSize: output.pageSize,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ToolResponseDto> {
    const output = await this.getTool.execute(id);
    return ToolPresenterMapper.toResponse(output);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateToolRequestDto,
  ): Promise<ToolResponseDto> {
    const output = await this.updateTool.execute({
      id,
      name: dto.name,
      location: dto.location,
    });
    return ToolPresenterMapper.toResponse(output);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteTool.execute(id);
  }
}
