import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMaterialUseCase } from '../../application/use-cases/create-material/create-material.use-case';
import { ListMaterialsUseCase } from '../../application/use-cases/list-materials/list-materials.use-case';
import { GetMaterialUseCase } from '../../application/use-cases/get-material/get-material.use-case';
import { UpdateMaterialUseCase } from '../../application/use-cases/update-material/update-material.use-case';
import { DeleteMaterialUseCase } from '../../application/use-cases/delete-material/delete-material.use-case';
import { RegisterMovementUseCase } from '../../application/use-cases/register-movement/register-movement.use-case';
import { ListMovementsUseCase } from '../../application/use-cases/list-movements/list-movements.use-case';
import type { StockMovementType } from '../../application/dtos/register-movement.input';
import { CreateMaterialRequestDto } from '../dtos/create-material.request.dto';
import { UpdateMaterialRequestDto } from '../dtos/update-material.request.dto';
import { MaterialResponseDto } from '../dtos/material.response.dto';
import { MaterialPresenterMapper } from '../mappers/material-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';
import { GetTenantId } from '../../../../common/decorators/get-tenant-id.decorator';
import { CurrentUser, type AuthenticatedUser } from '../../../../common/decorators/current-user.decorator';

@ApiTags('materials')
@ApiBearerAuth('clerk')
@Controller('materials')
@UseGuards(ClerkAuthGuard)
export class MaterialsController {
  constructor(
    private readonly createMaterial: CreateMaterialUseCase,
    private readonly listMaterials: ListMaterialsUseCase,
    private readonly getMaterial: GetMaterialUseCase,
    private readonly updateMaterial: UpdateMaterialUseCase,
    private readonly deleteMaterial: DeleteMaterialUseCase,
    private readonly registerMovement: RegisterMovementUseCase,
    private readonly listMovements: ListMovementsUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Crear material', description: 'Crea un nuevo material en el inventario' })
  @ApiResponse({ status: 201, description: 'Material creado exitosamente', type: MaterialResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateMaterialRequestDto): Promise<MaterialResponseDto> {
    const output = await this.createMaterial.execute({
      code: dto.code.toUpperCase(),
      name: dto.name,
      description: dto.description ?? null,
      unit: dto.unit,
      stock: dto.stock ? new Decimal(dto.stock) : undefined,
      minStock: dto.minStock ? new Decimal(dto.minStock) : undefined,
      location: dto.location ?? null,
    });
    return MaterialPresenterMapper.toResponse(output);
  }

  @Get()
  @ApiOperation({ summary: 'Listar materiales', description: 'Obtiene una lista paginada de materiales' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página' })
  @ApiResponse({ status: 200, description: 'Lista de materiales obtenida' })
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('search') search?: string,
    @Query('lowStockOnly') lowStockOnly?: string,
  ) {
    const output = await this.listMaterials.execute({
      tenantId,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      search: search?.trim() || undefined,
      lowStockOnly: lowStockOnly === 'true',
    });
    return {
      items: output.items.map((item) => MaterialPresenterMapper.toResponse(item)),
      total: output.total,
      page: output.page,
      pageSize: output.pageSize,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener material', description: 'Obtiene los detalles de un material por ID' })
  @ApiParam({ name: 'id', description: 'ID del material', type: String })
  @ApiResponse({ status: 200, description: 'Material encontrado', type: MaterialResponseDto })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  async get(@Param('id') id: string): Promise<MaterialResponseDto> {
    const output = await this.getMaterial.execute(id);
    return MaterialPresenterMapper.toResponse(output);
  }

  @Get(':id/movements')
  @ApiOperation({ summary: 'Movimientos de stock del material', description: 'Lista los movimientos de stock' })
  @ApiParam({ name: 'id', description: 'ID del material', type: String })
  @ApiResponse({ status: 200, description: 'Movimientos obtenidos' })
  async movements(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.listMovements.execute({
      materialId: id,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Post(':id/movements')
  @HttpCode(201)
  @ApiOperation({ summary: 'Registrar movimiento de stock', description: 'Registra entrada, salida, ajuste o consumo' })
  @ApiParam({ name: 'id', description: 'ID del material', type: String })
  @ApiResponse({ status: 201, description: 'Movimiento registrado' })
  @ApiResponse({ status: 400, description: 'Stock insuficiente o datos inválidos' })
  async createMovement(
    @Param('id') id: string,
    @Body() body: { type: StockMovementType; quantity: string; adjustmentSign?: 1 | -1; reason?: string | null; reference?: string | null },
    @CurrentUser() user: AuthenticatedUser,
    @GetTenantId() tenantId: string,
  ) {
    return this.registerMovement.execute({
      materialId: id,
      type: body.type,
      quantity: new Decimal(body.quantity),
      adjustmentSign: body.adjustmentSign,
      reason: body.reason ?? null,
      reference: body.reference ?? null,
      createdById: user.id,
      tenantId: tenantId ?? null,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar material', description: 'Actualiza los datos de un material' })
  @ApiParam({ name: 'id', description: 'ID del material', type: String })
  @ApiResponse({ status: 200, description: 'Material actualizado', type: MaterialResponseDto })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMaterialRequestDto,
  ): Promise<MaterialResponseDto> {
    const output = await this.updateMaterial.execute({
      id,
      name: dto.name,
      location: dto.location,
    });
    return MaterialPresenterMapper.toResponse(output);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar material', description: 'Elimina un material del inventario' })
  @ApiParam({ name: 'id', description: 'ID del material', type: String })
  @ApiResponse({ status: 204, description: 'Material eliminado' })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteMaterial.execute(id);
  }
}
