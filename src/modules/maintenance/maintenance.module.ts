import { Module } from '@nestjs/common';
import { MaintenanceController } from './presentation/controllers/maintenance.controller';
import { CreateMaintenanceOrderUseCase } from './application/use-cases/create-maintenance-order/create-maintenance-order.use-case';
import { PrismaMaintenanceOrderRepository } from './infrastructure/repositories/prisma-maintenance-order.repository';
import { MAINTENANCE_ORDER_REPOSITORY } from './domain/repositories/maintenance-order.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaintenanceController],
  providers: [
    CreateMaintenanceOrderUseCase,
    {
      provide: MAINTENANCE_ORDER_REPOSITORY,
      useClass: PrismaMaintenanceOrderRepository,
    },
  ],
  exports: [CreateMaintenanceOrderUseCase],
})
export class MaintenanceModule {}
