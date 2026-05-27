"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().int().positive().default(3000),
    HOST: zod_1.z.string().default('0.0.0.0'),
    API_PREFIX: zod_1.z.string().default('api'),
    API_VERSION: zod_1.z.string().default('1'),
    CORS_ORIGINS: zod_1.z
        .string()
        .default('http://localhost:5173')
        .transform((s) => s.split(',').map((o) => o.trim()).filter(Boolean)),
    LOG_LEVEL: zod_1.z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
    DATABASE_URL: zod_1.z.string().url(),
    CLERK_PUBLISHABLE_KEY: zod_1.z.string().min(1),
    CLERK_SECRET_KEY: zod_1.z.string().min(1),
    CLERK_JWT_ISSUER: zod_1.z.string().url().optional(),
    THROTTLE_TTL: zod_1.z.coerce.number().int().positive().default(60),
    THROTTLE_LIMIT: zod_1.z.coerce.number().int().positive().default(100),
    MULTI_TENANT_ENABLED: zod_1.z
        .string()
        .default('false')
        .transform((v) => v === 'true'),
});
//# sourceMappingURL=env.schema.js.map