import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
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

@ApiTags('tools')
@ApiBearerAuth('clerk')
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
  @ApiOperation({ summary: 'Crear herramienta', description: 'Crea una nueva herramienta en el inventario' })
  @ApiResponse({ status: 201, description: 'Herramienta creada exitosamente', type: ToolResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
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
  @ApiOperation({ summary: 'Listar herramientas', description: 'Obtiene una lista paginada de herramientas' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (default: 1)' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página (default: 10)' })
  @ApiResponse({ status: 200, description: 'Lista de herramientas obtenida' })
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('status') _status?: string,
    @Query('search') _search?: string,
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
  @ApiOperation({ summary: 'Obtener herramienta', description: 'Obtiene los detalles de una herramienta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la herramienta', type: String })
  @ApiResponse({ status: 200, description: 'Herramienta encontrada', type: ToolResponseDto })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada' })
  async get(@Param('id') id: string): Promise<ToolResponseDto> {
    const output = await this.getTool.execute(id);
    return ToolPresenterMapper.toResponse(output);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar herramienta', description: 'Actualiza los datos de una herramienta' })
  @ApiParam({ name: 'id', description: 'ID de la herramienta', type: String })
  @ApiResponse({ status: 200, description: 'Herramienta actualizada', type: ToolResponseDto })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada' })
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
  @ApiOperation({ summary: 'Eliminar herramienta', description: 'Elimina una herramienta del inventario' })
  @ApiParam({ name: 'id', description: 'ID de la herramienta', type: String })
  @ApiResponse({ status: 204, description: 'Herramienta eliminada' })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteTool.execute(id);
  }
}
