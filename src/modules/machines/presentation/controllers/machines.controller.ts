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
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMachineUseCase } from '../../application/use-cases/create-machine/create-machine.use-case';
import { ListMachinesUseCase } from '../../application/use-cases/list-machines/list-machines.use-case';
import { GetMachineUseCase } from '../../application/use-cases/get-machine/get-machine.use-case';
import { UpdateMachineUseCase } from '../../application/use-cases/update-machine/update-machine.use-case';
import { DeleteMachineUseCase } from '../../application/use-cases/delete-machine/delete-machine.use-case';
import { CreateMachineRequestDto } from '../dtos/create-machine.request.dto';
import { UpdateMachineRequestDto } from '../dtos/update-machine.request.dto';
import { MachineResponseDto } from '../dtos/machine.response.dto';
import { CreateMachineValidationPipe } from '../pipes/create-machine-validation.pipe';
import { MachinePresenterMapper } from '../mappers/machine-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';
import { GetTenantId } from '../../../../common/decorators/get-tenant-id.decorator';

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
  @UsePipes(CreateMachineValidationPipe, new ValidationPipe({ whitelist: true }))
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
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const output = await this.listMachines.execute({
      tenantId,
      page,
      pageSize,
    });
    return {
      items: output.items.map((item) => MachinePresenterMapper.toResponse(item as any)),
      total: output.total,
      page: output.page,
      pageSize: output.pageSize,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<MachineResponseDto> {
    const output = await this.getMachine.execute(id);
    return MachinePresenterMapper.toResponse(output);
  }

  @Patch(':id')
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
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteMachine.execute(id);
  }
}
