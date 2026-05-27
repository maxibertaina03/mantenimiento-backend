"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const logger_module_1 = require("./infrastructure/logger/logger.module");
const prisma_module_1 = require("./infrastructure/prisma/prisma.module");
const clerk_module_1 = require("./infrastructure/clerk/clerk.module");
const audit_module_1 = require("./infrastructure/audit/audit.module");
const clerk_auth_guard_1 = require("./common/guards/clerk-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const audit_interceptor_1 = require("./common/interceptors/audit.interceptor");
const health_module_1 = require("./health/health.module");
const iam_module_1 = require("./modules/iam/iam.module");
const tools_module_1 = require("./modules/tools/tools.module");
const materials_module_1 = require("./modules/materials/materials.module");
const machines_module_1 = require("./modules/machines/machines.module");
const maintenance_module_1 = require("./modules/maintenance/maintenance.module");
const providers_module_1 = require("./modules/providers/providers.module");
const audit_query_module_1 = require("./modules/audit/audit-query.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule,
            logger_module_1.LoggerModule,
            prisma_module_1.PrismaModule,
            clerk_module_1.ClerkModule,
            audit_module_1.AuditModule,
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (cs) => {
                    const cfg = (0, config_2.appConfig)(cs);
                    return [{ ttl: cfg.throttle.ttl * 1000, limit: cfg.throttle.limit }];
                },
            }),
            health_module_1.HealthModule,
            iam_module_1.IamModule,
            tools_module_1.ToolsModule,
            materials_module_1.MaterialsModule,
            machines_module_1.MachinesModule,
            maintenance_module_1.MaintenanceModule,
            providers_module_1.ProvidersModule,
            audit_query_module_1.AuditQueryModule,
            dashboard_module_1.DashboardModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: clerk_auth_guard_1.ClerkAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
            { provide: core_1.APP_INTERCEPTOR, useClass: audit_interceptor_1.AuditInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map