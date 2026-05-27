import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMaintenanceOrderUseCase } from '../../application/use-cases/create-maintenance-order/create-maintenance-order.use-case';
import { CreateMaintenanceOrderRequestDto } from '../dtos/create-maintenance-order.request.dto';
import { MaintenanceOrderResponseDto } from '../dtos/maintenance-order.response.dto';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';

@Controller('maintenance-orders')
@UseGuards(ClerkAuthGuard)
export class MaintenanceController {
  constructor(private readonly createOrder: CreateMaintenanceOrderUseCase) {}

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
}
