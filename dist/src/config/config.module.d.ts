import { ConfigService } from '@nestjs/config';
import { type AppConfig } from './configuration';
export declare class ConfigModule {
}
export declare const appConfig: (cs: ConfigService) => AppConfig;
