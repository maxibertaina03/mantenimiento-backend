import { Module } from '@nestjs/common';

/**
 * TODO (Fase 2 - Providers):
 *  - domain/provider.entity.ts
 *  - application/                     (RegisterProvider, UpdateProvider, DeactivateProvider, ListProviders, GetProviderHistory)
 *  - infrastructure/prisma-provider.repository.ts
 *  - presentation/providers.controller.ts
 *
 * `GetProviderHistory` agrega los `MaintenanceOrder` donde `providerId = X`.
 */
@Module({})
export class ProvidersModule {}
