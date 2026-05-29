import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMachineUseCase } from '../../application/use-cases/create-machine/create-machine.use-case';
import { ListMachinesUseCase } from '../../application/use-cases/list-machines/list-machines.use-case';
import { GetMachineUseCase } from '../../application/use-cases/get-machine/get-machine.use-case';
import { UpdateMachineUseCase } from '../../application/use-cases/update-machine/update-machine.use-case';
import { DeleteMachineUseCase } from '../../application/use-cases/delete-machine/delete-machine.use-case';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
import { CreateMachineRequestDto } from '../dtos/create-machine.request.dto';
import { UpdateMachineRequestDto } from '../dtos/update-machine.request.dto';
import { MachineResponseDto } from '../dtos/machine.response.dto';
import { MachinePresenterMapper } from '../mappers/machine-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';
import { GetTenantId } from '../../../../common/decorators/get-tenant-id.decorator';

@ApiTags('machines')
@ApiBearerAuth('clerk')
@Controller('machines')
@UseGuards(ClerkAuthGuard)
export class MachinesController {
  constructor(
    private readonly createMachine: CreateMachineUseCase,
    private readonly listMachines: ListMachinesUseCase,
    private readonly getMachine: GetMachineUseCase,
    private readonly updateMachine: UpdateMachineUseCase,
    private readonly deleteMachine: DeleteMachineUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Crear máquina', description: 'Crea una nueva máquina en el inventario' })
  @ApiResponse({ status: 201, description: 'Máquina creada exitosamente', type: MachineResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateMachineRequestDto): Promise<MachineResponseDto> {
    const output = await this.createMachine.execute({
      code: dto.code,
      name: dto.name,
      brand: dto.brand ?? null,
      model: dto.model ?? null,
      serialNumber: dto.serialNumber ?? null,
      status: dto.status,
      usageHours: dto.usageHours ? new Decimal(dto.usageHours) : undefined,
      location: dto.location ?? null,
      responsibleId: dto.responsibleId ?? null,
      notes: dto.notes ?? null,
      preventiveIntervalHours: dto.preventiveIntervalHours ? new Decimal(dto.preventiveIntervalHours) : null,
    });
    return MachinePresenterMapper.toResponse(output);
  }

  @Get()
  @ApiOperation({ summary: 'Listar máquinas', description: 'Obtiene una lista paginada de máquinas' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página' })
  @ApiResponse({ status: 200, description: 'Lista de máquinas obtenida' })
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('status') status?: string,
    @Query('responsibleId') responsibleId?: string,
    @Query('search') search?: string,
  ) {
    const output = await this.listMachines.execute({
      tenantId,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      search: search?.trim() || undefined,
      status: (status as MachineStatus) || undefined,
      responsibleId: responsibleId || undefined,
    });
    return {
      items: output.items.map((item) => MachinePresenterMapper.toResponse(item)),
      total: output.total,
      page: output.page,
      pageSize: output.pageSize,
    };
  }

  @Get('preventive-alerts')
  @ApiOperation({ summary: 'Alertas preventivas', description: 'Lista máquinas que necesitan mantenimiento preventivo' })
  @ApiResponse({ status: 200, description: 'Lista de alertas obtenida' })
  async preventiveAlerts(@GetTenantId() _tenantId: string) {
    return [];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener máquina', description: 'Obtiene los detalles de una máquina por ID' })
  @ApiParam({ name: 'id', description: 'ID de la máquina', type: String })
  @ApiResponse({ status: 200, description: 'Máquina encontrada', type: MachineResponseDto })
  @ApiResponse({ status: 404, description: 'Máquina no encontrada' })
  async get(@Param('id') id: string): Promise<MachineResponseDto> {
    const output = await this.getMachine.execute(id);
    return MachinePresenterMapper.toResponse(output);
  }

  @Get(':id/usage-logs')
  @ApiOperation({ summary: 'Logs de uso de máquina', description: 'Lista los registros de horas de uso' })
  @ApiParam({ name: 'id', description: 'ID de la máquina', type: String })
  @ApiResponse({ status: 200, description: 'Logs de uso obtenidos' })
  async usageLogs(@Param('id') _id: string) {
    return [];
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar máquina', description: 'Actualiza los datos de una máquina' })
  @ApiParam({ name: 'id', description: 'ID de la máquina', type: String })
  @ApiResponse({ status: 200, description: 'Máquina actualizada', type: MachineResponseDto })
  @ApiResponse({ status: 404, description: 'Máquina no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMachineRequestDto,
  ): Promise<MachineResponseDto> {
    const output = await this.updateMachine.execute({
      id,
      name: dto.name,
      location: dto.location,
    });
    return MachinePresenterMapper.toResponse(output);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar máquina', description: 'Elimina una máquina del inventario' })
  @ApiParam({ name: 'id', description: 'ID de la máquina', type: String })
  @ApiResponse({ status: 204, description: 'Máquina eliminada' })
  @ApiResponse({ status: 404, description: 'Máquina no encontrada' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteMachine.execute(id);
  }
}
