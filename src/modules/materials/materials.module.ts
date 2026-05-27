import { Module } from '@nestjs/common';
import { MaterialsController } from './presentation/controllers/materials.controller';
import { CreateMaterialUseCase } from './application/use-cases/create-material/create-material.use-case';
import { PrismaMaterialRepository } from './infrastructure/repositories/prisma-material.repository';
import { MATERIAL_REPOSITORY } from './domain/repositories/material.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaterialsController],
  providers: [
    CreateMaterialUseCase,
    {
      provide: MATERIAL_REPOSITORY,
      useClass: PrismaMaterialRepository,
    },
  ],
  exports: [CreateMaterialUseCase],
})
export class MaterialsModule {}
