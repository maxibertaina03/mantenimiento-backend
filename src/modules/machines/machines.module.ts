import { Module } from '@nestjs/common';
import { MachinesController } from './presentation/controllers/machines.controller';
import { CreateMachineUseCase } from './application/use-cases/create-machine/create-machine.use-case';
import { PrismaMachineRepository } from './infrastructure/repositories/prisma-machine.repository';
import { MACHINE_REPOSITORY } from './domain/repositories/machine.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MachinesController],
  providers: [
    CreateMachineUseCase,
    {
      provide: MACHINE_REPOSITORY,
      useClass: PrismaMachineRepository,
    },
  ],
  exports: [CreateMachineUseCase],
})
export class MachinesModule {}
