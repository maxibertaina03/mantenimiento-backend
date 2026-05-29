import { Inject, Injectable } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { IMachineRepository, MACHINE_REPOSITORY } from '../../../domain/repositories/machine.repository';
import { MachineNotFoundException } from '../../../domain/exceptions/machine-not-found.exception';
import { InvalidMachineException } from '../../../domain/exceptions/invalid-machine.exception';
import { PrismaMachineMapper } from '../../../infrastructure/mappers/prisma-machine.mapper';
import { MachineAppMapper } from '../../mappers/machine-app.mapper';
import { LogHoursInput } from '../../dtos/log-hours.input';
import { UsageLogOutput } from '../../dtos/usage-log.output';
import type { CreateMachineOutput } from '../../dtos/create-machine.output';

export interface LogHoursOutput {
  machine: CreateMachineOutput;
  log: UsageLogOutput;
}

/**
 * Registra una nueva lectura del contador de horas de una máquina.
 * Reglas:
 *  - `hoursAfter` debe ser >= `usageHours` actual (los contadores no retroceden).
 *  - Se calcula `delta = hoursAfter - hoursBefore`.
 *  - Se actualiza el contador acumulado de la máquina al valor `hoursAfter`.
 *  - Se crea un MachineUsageLog inmutable.
 * Atómico vía transacción Prisma.
 */
@Injectable()
export class LogHoursUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY) private readonly repository: IMachineRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: LogHoursInput): Promise<LogHoursOutput> {
    const machine = await this.repository.findById(input.machineId);
    if (!machine) throw new MachineNotFoundException(input.machineId);

    const hoursBefore = machine.getUsageHours();
    if (input.hoursAfter.lessThan(hoursBefore)) {
      throw new InvalidMachineException(
        `hoursAfter (${input.hoursAfter}) no puede ser menor a la lectura actual (${hoursBefore})`,
      );
    }
    const delta = input.hoursAfter.minus(hoursBefore);

    // logUsageHours(delta) suma el delta al acumulado actual → llegará a hoursAfter
    machine.logUsageHours(delta);

    const logId = generateUUID();
    const now = new Date();
    const machineData = PrismaMachineMapper.toPersistence(machine);

    await this.prisma.$transaction([
      this.prisma.machine.update({
        where: { id: machine.getId() },
        data: machineData,
      }),
      this.prisma.machineUsageLog.create({
        data: {
          id: logId,
          machineId: machine.getId(),
          hoursBefore,
          hoursAfter: input.hoursAfter,
          delta,
          notes: input.notes ?? null,
          createdById: input.createdById,
          tenantId: input.tenantId ?? null,
        },
      }),
    ]);

    return {
      machine: MachineAppMapper.toOutput(machine),
      log: {
        id: logId,
        machineId: machine.getId(),
        hoursBefore,
        hoursAfter: input.hoursAfter,
        delta,
        notes: input.notes ?? null,
        createdById: input.createdById,
        createdAt: now,
      },
    };
  }
}
