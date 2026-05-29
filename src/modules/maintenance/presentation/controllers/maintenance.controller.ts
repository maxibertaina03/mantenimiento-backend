import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMaintenanceOrderUseCase } from '../../application/use-cases/create-maintenance-order/create-maintenance-order.use-case';
import { ListMaintenanceOrdersUseCase } from '../../application/use-cases/list-maintenance-orders/list-maintenance-orders.use-case';
import { GetMaintenanceOrderUseCase } from '../../application/use-cases/get-maintenance-order/get-maintenance-order.use-case';
import { StartMaintenanceOrderUseCase } from '../../application/use-cases/start-maintenance-order/start-maintenance-order.use-case';
import { CompleteMaintenanceOrderUseCase } from '../../application/use-cases/complete-maintenance-order/complete-maintenance-order.use-case';
import { DeleteMaintenanceOrderUseCase } from '../../application/use-cases/delete-maintenance-order/delete-maintenance-order.use-case';
import { CreateMaintenanceOrderRequestDto } from '../dtos/create-maintenance-order.request.dto';
import { MaintenanceOrderResponseDto } from '../dtos/maintenance-order.response.dto';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';
import { GetTenantId } from '../../../../common/decorators/get-tenant-id.decorator';

@ApiTags('maintenance-orders')
@ApiBearerAuth('clerk')
@Controller('maintenance-orders')
@UseGuards(ClerkAuthGuard)
export class MaintenanceController {
  constructor(
    private readonly createOrder: CreateMaintenanceOrderUseCase,
    private readonly listOrders: ListMaintenanceOrdersUseCase,
    private readonly getOrder: GetMaintenanceOrderUseCase,
    private readonly startOrder: StartMaintenanceOrderUseCase,
    private readonly completeOrder: CompleteMaintenanceOrderUseCase,
    private readonly deleteOrder: DeleteMaintenanceOrderUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Crear orden de mantenimiento', description: 'Crea una nueva orden de mantenimiento para una máquina' })
  @ApiResponse({ status: 201, description: 'Orden de mantenimiento creada exitosamente', type: MaintenanceOrderResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateMaintenanceOrderRequestDto): Promise<MaintenanceOrderResponseDto> {
    const output = await this.createOrder.execute({
      machineId: dto.machineId,
      type: dto.type,
      location: dto.location,
      externalLocation: dto.externalLocation ?? null,
      scheduledFor: dto.scheduledFor ? new Date(dto.scheduledFor) : null,
      technicianId: dto.technicianId ?? null,
      providerId: dto.providerId ?? null,
      cost: dto.cost ? new Decimal(dto.cost) : null,
      currency: dto.currency,
      description: dto.description ?? null,
      observations: dto.observations ?? null,
    });
    return {
      id: output.id,
      machineId: output.machineId,
      type: output.type,
      status: output.status,
      location: output.location,
      cost: output.cost,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar órdenes de mantenimiento', description: 'Obtiene una lista paginada de órdenes de mantenimiento' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida' })
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('machineId') _machineId?: string,
    @Query('status') _status?: string,
    @Query('type') _type?: string,
    @Query('technicianId') _technicianId?: string,
    @Query('providerId') _providerId?: string,
    @Query('scheduledFrom') _scheduledFrom?: string,
    @Query('scheduledTo') _scheduledTo?: string,
  ) {
    const output = await this.listOrders.execute({
      tenantId,
      page,
      pageSize,
    });
    return {
      items: output.items.map((item) => ({
        id: item.id,
        machineId: item.machineId,
        type: item.type,
        status: item.status,
        location: item.location,
        scheduledFor: item.scheduledFor,
        startedAt: item.startedAt,
        createdAt: item.createdAt,
      })),
      total: output.total,
      page: output.page,
      pageSize: output.pageSize,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden de mantenimiento', description: 'Obtiene los detalles de una orden de mantenimiento por ID' })
  @ApiParam({ name: 'id', description: 'ID de la orden de mantenimiento', type: String })
  @ApiResponse({ status: 200, description: 'Orden encontrada', type: MaintenanceOrderResponseDto })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async get(@Param('id') id: string): Promise<MaintenanceOrderResponseDto> {
    const output = await this.getOrder.execute(id);
    return {
      id: output.id,
      machineId: output.machineId,
      type: output.type,
      status: output.status,
      location: output.location,
      cost: output.cost,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Iniciar mantenimiento', description: 'Marca una orden de mantenimiento como iniciada' })
  @ApiParam({ name: 'id', description: 'ID de la orden de mantenimiento', type: String })
  @ApiResponse({ status: 200, description: 'Mantenimiento iniciado', type: MaintenanceOrderResponseDto })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async start(@Param('id') id: string): Promise<MaintenanceOrderResponseDto> {
    const output = await this.startOrder.execute(id);
    return {
      id: output.id,
      machineId: output.machineId,
      type: output.type,
      status: output.status,
      location: output.location,
      cost: output.cost,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Completar mantenimiento', description: 'Marca una orden de mantenimiento como completada' })
  @ApiParam({ name: 'id', description: 'ID de la orden de mantenimiento', type: String })
  @ApiResponse({ status: 200, description: 'Mantenimiento completado', type: MaintenanceOrderResponseDto })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async complete(@Param('id') id: string): Promise<MaintenanceOrderResponseDto> {
    const output = await this.completeOrder.execute(id);
    return {
      id: output.id,
      machineId: output.machineId,
      type: output.type,
      status: output.status,
      location: output.location,
      cost: output.cost,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar orden de mantenimiento', description: 'Elimina una orden de mantenimiento' })
  @ApiParam({ name: 'id', description: 'ID de la orden de mantenimiento', type: String })
  @ApiResponse({ status: 204, description: 'Orden eliminada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteOrder.execute(id);
  }
}
