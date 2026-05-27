import { Module } from '@nestjs/common';
import { ProvidersController } from './presentation/controllers/providers.controller';
import { CreateProviderUseCase } from './application/use-cases/create-provider/create-provider.use-case';
import { PrismaProviderRepository } from './infrastructure/repositories/prisma-provider.repository';
import { PROVIDER_REPOSITORY } from './domain/repositories/provider.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProvidersController],
  providers: [
    CreateProviderUseCase,
    {
      provide: PROVIDER_REPOSITORY,
      useClass: PrismaProviderRepository,
    },
  ],
  exports: [CreateProviderUseCase],
})
export class ProvidersModule {}
