import { Module } from '@nestjs/common';

import { ProvidersController } from './presentation/providers.controller';
import { PROVIDER_REPOSITORY } from './domain/provider.repository';
import { PrismaProviderRepository } from './infrastructure/prisma-provider.repository';

import { RegisterProviderUseCase } from './application/register-provider.use-case';
import { UpdateProviderUseCase } from './application/update-provider.use-case';
import { ToggleActiveProviderUseCase } from './application/toggle-active-provider.use-case';
import { ListProvidersUseCase } from './application/list-providers.use-case';
import { GetProviderUseCase } from './application/get-provider.use-case';

@Module({
  controllers: [ProvidersController],
  providers: [
    { provide: PROVIDER_REPOSITORY, useClass: PrismaProviderRepository },
    RegisterProviderUseCase,
    UpdateProviderUseCase,
    ToggleActiveProviderUseCase,
    ListProvidersUseCase,
    GetProviderUseCase,
  ],
})
export class ProvidersModule {}
