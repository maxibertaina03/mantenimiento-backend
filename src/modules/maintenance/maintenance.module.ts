import { Module } from '@nestjs/common';
import { MaintenanceController } from './presentation/controllers/maintenance.controller';
import { CreateMaintenanceOrderUseCase } from './application/use-cases/create-maintenance-order/create-maintenance-order.use-case';
import { ListMaintenanceOrdersUseCase } from './application/use-cases/list-maintenance-orders/list-maintenance-orders.use-case';
import { GetMaintenanceOrderUseCase } from './application/use-cases/get-maintenance-order/get-maintenance-order.use-case';
import { StartMaintenanceOrderUseCase } from './application/use-cases/start-maintenance-order/start-maintenance-order.use-case';
import { CompleteMaintenanceOrderUseCase } from './application/use-cases/complete-maintenance-order/complete-maintenance-order.use-case';
import { DeleteMaintenanceOrderUseCase } from './application/use-cases/delete-maintenance-order/delete-maintenance-order.use-case';
import { PrismaMaintenanceOrderRepository } from './infrastructure/repositories/prisma-maintenance-order.repository';
import { MAINTENANCE_ORDER_REPOSITORY } from './domain/repositories/maintenance-order.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaintenanceController],
  providers: [
    CreateMaintenanceOrderUseCase,
    ListMaintenanceOrdersUseCase,
    GetMaintenanceOrderUseCase,
    StartMaintenanceOrderUseCase,
    CompleteMaintenanceOrderUseCase,
    DeleteMaintenanceOrderUseCase,
    {
      provide: MAINTENANCE_ORDER_REPOSITORY,
      useClass: PrismaMaintenanceOrderRepository,
    },
  ],
  exports: [
    CreateMaintenanceOrderUseCase,
    ListMaintenanceOrdersUseCase,
    GetMaintenanceOrderUseCase,
    StartMaintenanceOrderUseCase,
    CompleteMaintenanceOrderUseCase,
    DeleteMaintenanceOrderUseCase,
  ],
})
export class MaintenanceModule {}
