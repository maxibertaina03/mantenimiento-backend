import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

import { ConfigModule, appConfig } from './config';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ClerkModule } from './infrastructure/clerk/clerk.module';
import { AuditModule } from './infrastructure/audit/audit.module';

import { ClerkAuthGuard } from './common/guards/clerk-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';

import { HealthModule } from './health/health.module';

// Bounded contexts
import { IamModule } from './modules/iam/iam.module';
import { ToolsModule } from './modules/tools/tools.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { MachinesModule } from './modules/machines/machines.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { AuditQueryModule } from './modules/audit/audit-query.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    // Infraestructura global
    ConfigModule,
    LoggerModule,
    PrismaModule,
    ClerkModule,
    AuditModule,

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => {
        const cfg = appConfig(cs);
        return [{ ttl: cfg.throttle.ttl * 1000, limit: cfg.throttle.limit }];
      },
    }),

    HealthModule,

    // Bounded contexts (modular monolith)
    IamModule,
    ToolsModule,
    MaterialsModule,
    MachinesModule,
    MaintenanceModule,
    ProvidersModule,
    AuditQueryModule,
    DashboardModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: ClerkAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
  ],
})
export class AppModule {}
