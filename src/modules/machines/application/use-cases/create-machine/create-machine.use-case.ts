import { Injectable, Inject } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { Decimal } from '@prisma/client/runtime/library';
import { Machine } from '../../../domain/entities/machine.entity';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../../domain/repositories/machine.repository';
import { MachineStatus } from '../../../domain/value-objects/machine-status.vo';
import { InvalidMachineException } from '../../../domain/exceptions/invalid-machine.exception';
import { CreateMachineInput } from '../../dtos/create-machine.input';
import { CreateMachineOutput } from '../../dtos/create-machine.output';
import { MachineAppMapper } from '../../mappers/machine-app.mapper';

@Injectable()
export class CreateMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY)
    private readonly repository: IMachineRepository,
  ) {}

  async execute(input: CreateMachineInput): Promise<CreateMachineOutput> {
    // 1. Crear entidad de dominio
    const machine = new Machine(
      generateUUID(),
      input.code,
      input.name,
      input.status ?? MachineStatus.OPERATIONAL,
      input.usageHours ?? new Decimal(0),
      input.brand ?? null,
      input.model ?? null,
      input.serialNumber ?? null,
      input.location ?? null,
      input.responsibleId ?? null,
      input.notes ?? null,
      input.preventiveIntervalHours ?? null,
      null, // lastPreventiveAtHours
      null, // tenantId
    );

    // 2. Validar invariantes de negocio
    const existingMachine = await this.repository.findByCode(machine.getCode());
    if (existingMachine) {
      throw new InvalidMachineException(`Machine with code "${machine.getCode()}" already exists`);
    }

    // 3. Persistir
    await this.repository.save(machine);

    // 4. Retornar DTO de salida
    return MachineAppMapper.toOutput(machine);
  }
}
