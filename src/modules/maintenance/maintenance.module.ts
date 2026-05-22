import { Module } from '@nestjs/common';

import { MachinesModule } from '@/modules/machines/machines.module';

import { MaintenanceController } from './presentation/maintenance.controller';
import { MAINTENANCE_REPOSITORY } from './domain/maintenance.repository';
import { PrismaMaintenanceRepository } from './infrastructure/prisma-maintenance.repository';

import { ScheduleMaintenanceUseCase } from './application/schedule-maintenance.use-case';
import { StartMaintenanceUseCase } from './application/start-maintenance.use-case';
import { CompleteMaintenanceUseCase } from './application/complete-maintenance.use-case';
import { CancelMaintenanceUseCase } from './application/cancel-maintenance.use-case';
import { UpdateMaintenanceUseCase } from './application/update-maintenance.use-case';
import { ListMaintenanceUseCase } from './application/list-maintenance.use-case';
import { GetMaintenanceUseCase } from './application/get-maintenance.use-case';

@Module({
  imports: [MachinesModule],
  controllers: [MaintenanceController],
  providers: [
    { provide: MAINTENANCE_REPOSITORY, useClass: PrismaMaintenanceRepository },
    ScheduleMaintenanceUseCase,
    StartMaintenanceUseCase,
    CompleteMaintenanceUseCase,
    CancelMaintenanceUseCase,
    UpdateMaintenanceUseCase,
    ListMaintenanceUseCase,
    GetMaintenanceUseCase,
  ],
})
export class MaintenanceModule {}
