import { Module } from '@nestjs/common';
import { MachinesController } from './presentation/controllers/machines.controller';
import { CreateMachineUseCase } from './application/use-cases/create-machine/create-machine.use-case';
import { ListMachinesUseCase } from './application/use-cases/list-machines/list-machines.use-case';
import { GetMachineUseCase } from './application/use-cases/get-machine/get-machine.use-case';
import { UpdateMachineUseCase } from './application/use-cases/update-machine/update-machine.use-case';
import { DeleteMachineUseCase } from './application/use-cases/delete-machine/delete-machine.use-case';
import { LogHoursUseCase } from './application/use-cases/log-hours/log-hours.use-case';
import { ListUsageLogsUseCase } from './application/use-cases/list-usage-logs/list-usage-logs.use-case';
import { ChangeMachineStatusUseCase } from './application/use-cases/change-machine-status/change-machine-status.use-case';
import { PrismaMachineRepository } from './infrastructure/repositories/prisma-machine.repository';
import { MACHINE_REPOSITORY } from './domain/repositories/machine.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MachinesController],
  providers: [
    CreateMachineUseCase,
    ListMachinesUseCase,
    GetMachineUseCase,
    UpdateMachineUseCase,
    DeleteMachineUseCase,
    LogHoursUseCase,
    ListUsageLogsUseCase,
    ChangeMachineStatusUseCase,
    {
      provide: MACHINE_REPOSITORY,
      useClass: PrismaMachineRepository,
    },
  ],
  exports: [
    CreateMachineUseCase,
    ListMachinesUseCase,
    GetMachineUseCase,
    UpdateMachineUseCase,
    DeleteMachineUseCase,
    LogHoursUseCase,
    ListUsageLogsUseCase,
    ChangeMachineStatusUseCase,
  ],
})
export class MachinesModule {}
