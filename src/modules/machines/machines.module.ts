import { Module } from '@nestjs/common';

import { MachinesController } from './presentation/machines.controller';
import { MACHINE_REPOSITORY } from './domain/machine.repository';
import { PrismaMachineRepository } from './infrastructure/prisma-machine.repository';

import { RegisterMachineUseCase } from './application/register-machine.use-case';
import { UpdateMachineUseCase } from './application/update-machine.use-case';
import { ChangeMachineStatusUseCase } from './application/change-machine-status.use-case';
import { LogMachineHoursUseCase } from './application/log-machine-hours.use-case';
import { ListMachinesUseCase } from './application/list-machines.use-case';
import { GetMachineUseCase } from './application/get-machine.use-case';
import { DeleteMachineUseCase } from './application/delete-machine.use-case';
import { GetPreventiveAlertsUseCase } from './application/get-preventive-alerts.use-case';
import { ListUsageLogsUseCase } from './application/list-usage-logs.use-case';

import { MachinePublicService } from './application/machine-public.service';

@Module({
  controllers: [MachinesController],
  providers: [
    { provide: MACHINE_REPOSITORY, useClass: PrismaMachineRepository },
    RegisterMachineUseCase,
    UpdateMachineUseCase,
    ChangeMachineStatusUseCase,
    LogMachineHoursUseCase,
    ListMachinesUseCase,
    GetMachineUseCase,
    DeleteMachineUseCase,
    GetPreventiveAlertsUseCase,
    ListUsageLogsUseCase,
    MachinePublicService,
  ],
  exports: [MachinePublicService],
})
export class MachinesModule {}
