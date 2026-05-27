import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMachineUseCase } from '../../application/use-cases/create-machine/create-machine.use-case';
import { CreateMachineRequestDto } from '../dtos/create-machine.request.dto';
import { MachineResponseDto } from '../dtos/machine.response.dto';
import { CreateMachineValidationPipe } from '../pipes/create-machine-validation.pipe';
import { MachinePresenterMapper } from '../mappers/machine-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';

@Controller('machines')
@UseGuards(ClerkAuthGuard)
export class MachinesController {
  constructor(private readonly createMachine: CreateMachineUseCase) {}

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
}
