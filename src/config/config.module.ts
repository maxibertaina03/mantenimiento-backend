import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import { loadConfig, type AppConfig } from './configuration';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [() => ({ app: loadConfig() })],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}

/**
 * Acceso tipado a la configuración. Falla con assertion si el namespace `app`
 * no fue inicializado (no debería ocurrir si el módulo se cargó correctamente).
 */
export const appConfig = (cs: ConfigService): AppConfig => {
  const cfg = cs.get<AppConfig>('app');
  if (!cfg) {
    throw new Error('AppConfig no inicializada. ¿Se importó ConfigModule globalmente?');
  }
  return cfg;
};
