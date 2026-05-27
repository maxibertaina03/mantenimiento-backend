import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe, Get, Param, Query, Patch, Delete } from '@nestjs/common';
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
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
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
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteOrder.execute(id);
  }
}
