import { envSchema, type Env } from './env.schema';

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

/**
 * Carga y valida `process.env` contra el schema Zod.
 * Lanza si las env vars no satisfacen las restricciones.
 */
export function loadConfig(): AppConfig {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Configuración inválida:\n${issues}`);
  }

  const env = parsed.data;

  return {
    env: env.NODE_ENV,
    port: env.PORT,
    host: env.HOST,
    apiPrefix: env.API_PREFIX,
    apiVersion: env.API_VERSION,
    corsOrigins: env.CORS_ORIGINS,
    logLevel: env.LOG_LEVEL,
    database: { url: env.DATABASE_URL },
    clerk: {
      publishableKey: env.CLERK_PUBLISHABLE_KEY,
      secretKey: env.CLERK_SECRET_KEY,
      jwtIssuer: env.CLERK_JWT_ISSUER,
    },
    throttle: { ttl: env.THROTTLE_TTL, limit: env.THROTTLE_LIMIT },
    multiTenant: { enabled: env.MULTI_TENANT_ENABLED },
  };
}
