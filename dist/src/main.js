"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const config_2 = require("./config");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_response_interceptor_1 = require("./common/interceptors/transform-response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    const cfg = (0, config_2.appConfig)(app.get(config_1.ConfigService));
    app.use((0, helmet_1.default)({ contentSecurityPolicy: cfg.env === 'production' }));
    app.enableCors({
        origin: cfg.corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    app.setGlobalPrefix(cfg.apiPrefix, { exclude: ['health', 'health/(.*)'] });
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: cfg.apiVersion });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)), new transform_response_interceptor_1.TransformResponseInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(app.get(nestjs_pino_1.Logger)));
    app.enableShutdownHooks();
    if (cfg.env !== 'production') {
        const swaggerCfg = new swagger_1.DocumentBuilder()
            .setTitle('Mantenimiento2 API')
            .setDescription('API de gestión de mantenimiento e inventario')
            .setVersion(cfg.apiVersion)
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'clerk')
            .build();
        const doc = swagger_1.SwaggerModule.createDocument(app, swaggerCfg);
        swagger_1.SwaggerModule.setup(`${cfg.apiPrefix}/docs`, app, doc, {
            swaggerOptions: { persistAuthorization: true },
        });
    }
    await app.listen(cfg.port, cfg.host);
    const url = await app.getUrl();
    console.log(`\n  🚀 Mantenimiento2 API ready at ${url}/${cfg.apiPrefix}/v${cfg.apiVersion}\n`);
}
void bootstrap();
//# sourceMappingURL=main.js.map