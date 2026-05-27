import { type Env } from './env.schema';
export interface AppConfig {
    env: Env['NODE_ENV'];
    port: number;
    host: string;
    apiPrefix: string;
    apiVersion: string;
    corsOrigins: string[];
    logLevel: Env['LOG_LEVEL'];
    database: {
        url: string;
    };
    clerk: {
        publishableKey: string;
        secretKey: string;
        jwtIssuer?: string;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    multiTenant: {
        enabled: boolean;
    };
}
export declare function loadConfig(): AppConfig;
