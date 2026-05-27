import { Module } from '@nestjs/common';
import { ProvidersController } from './presentation/controllers/providers.controller';
import { CreateProviderUseCase } from './application/use-cases/create-provider/create-provider.use-case';
import { ListProvidersUseCase } from './application/use-cases/list-providers/list-providers.use-case';
import { GetProviderUseCase } from './application/use-cases/get-provider/get-provider.use-case';
import { UpdateProviderUseCase } from './application/use-cases/update-provider/update-provider.use-case';
import { DeleteProviderUseCase } from './application/use-cases/delete-provider/delete-provider.use-case';
import { PrismaProviderRepository } from './infrastructure/repositories/prisma-provider.repository';
import { PROVIDER_REPOSITORY } from './domain/repositories/provider.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProvidersController],
  providers: [
    CreateProviderUseCase,
    ListProvidersUseCase,
    GetProviderUseCase,
    UpdateProviderUseCase,
    DeleteProviderUseCase,
    {
      provide: PROVIDER_REPOSITORY,
      useClass: PrismaProviderRepository,
    },
  ],
  exports: [CreateProviderUseCase, ListProvidersUseCase, GetProviderUseCase, UpdateProviderUseCase, DeleteProviderUseCase],
})
export class ProvidersModule {}
