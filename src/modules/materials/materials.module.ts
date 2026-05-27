import { Module } from '@nestjs/common';
import { MaterialsController } from './presentation/controllers/materials.controller';
import { CreateMaterialUseCase } from './application/use-cases/create-material/create-material.use-case';
import { ListMaterialsUseCase } from './application/use-cases/list-materials/list-materials.use-case';
import { GetMaterialUseCase } from './application/use-cases/get-material/get-material.use-case';
import { UpdateMaterialUseCase } from './application/use-cases/update-material/update-material.use-case';
import { DeleteMaterialUseCase } from './application/use-cases/delete-material/delete-material.use-case';
import { PrismaMaterialRepository } from './infrastructure/repositories/prisma-material.repository';
import { MATERIAL_REPOSITORY } from './domain/repositories/material.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaterialsController],
  providers: [
    CreateMaterialUseCase,
    ListMaterialsUseCase,
    GetMaterialUseCase,
    UpdateMaterialUseCase,
    DeleteMaterialUseCase,
    {
      provide: MATERIAL_REPOSITORY,
      useClass: PrismaMaterialRepository,
    },
  ],
  exports: [CreateMaterialUseCase, ListMaterialsUseCase, GetMaterialUseCase, UpdateMaterialUseCase, DeleteMaterialUseCase],
})
export class MaterialsModule {}
