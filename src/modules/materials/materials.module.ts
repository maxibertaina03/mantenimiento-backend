import { Module } from '@nestjs/common';

import { MaterialsController } from './presentation/materials.controller';
import { MATERIAL_REPOSITORY } from './domain/material.repository';
import { PrismaMaterialRepository } from './infrastructure/prisma-material.repository';

import { RegisterMaterialUseCase } from './application/register-material.use-case';
import { UpdateMaterialUseCase } from './application/update-material.use-case';
import { RegisterMovementUseCase } from './application/register-movement.use-case';
import { ListMaterialsUseCase } from './application/list-materials.use-case';
import { GetMaterialUseCase } from './application/get-material.use-case';
import { ListMovementsUseCase } from './application/list-movements.use-case';
import { DeleteMaterialUseCase } from './application/delete-material.use-case';

@Module({
  controllers: [MaterialsController],
  providers: [
    { provide: MATERIAL_REPOSITORY, useClass: PrismaMaterialRepository },
    RegisterMaterialUseCase,
    UpdateMaterialUseCase,
    RegisterMovementUseCase,
    ListMaterialsUseCase,
    GetMaterialUseCase,
    ListMovementsUseCase,
    DeleteMaterialUseCase,
  ],
})
export class MaterialsModule {}
