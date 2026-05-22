import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { appConfig } from './config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Logger pino
  app.useLogger(app.get(Logger));

  const cfg = appConfig(app.get(ConfigService));

  // Seguridad y CORS
  app.use(helmet({ contentSecurityPolicy: cfg.env === 'production' }));
  app.enableCors({
    origin: cfg.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Prefix + versioning
  app.setGlobalPrefix(cfg.apiPrefix, { exclude: ['health', 'health/(.*)'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: cfg.apiVersion });

  // Pipes / interceptors / filters globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformResponseInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter(app.get(Logger)));

  // Shutdown hooks
  app.enableShutdownHooks();

  // Swagger (no se expone en producción)
  if (cfg.env !== 'production') {
    const swaggerCfg = new DocumentBuilder()
      .setTitle('Mantenimiento2 API')
      .setDescription('API de gestión de mantenimiento e inventario')
      .setVersion(cfg.apiVersion)
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'clerk')
      .build();
    const doc = SwaggerModule.createDocument(app, swaggerCfg);
    SwaggerModule.setup(`${cfg.apiPrefix}/docs`, app, doc, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  await app.listen(cfg.port, cfg.host);

  const url = await app.getUrl();
  // eslint-disable-next-line no-console
  console.log(`\n  🚀 Mantenimiento2 API ready at ${url}/${cfg.apiPrefix}/v${cfg.apiVersion}\n`);
}

void bootstrap();
