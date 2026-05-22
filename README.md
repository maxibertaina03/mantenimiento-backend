# Mantenimiento2 · API (NestJS)

Backend del sistema de mantenimiento e inventario, construido sobre **NestJS 10 + Prisma 5 + PostgreSQL 16**, siguiendo **DDD + Clean Architecture** con un **modular monolith** preparado para escalar a microservicios.

## Estructura

```
backend/
├── prisma/
│   ├── schema.prisma           # Modelo de datos completo
│   └── seed.ts                 # Seed inicial
├── src/
│   ├── main.ts                 # Bootstrap
│   ├── app.module.ts           # Composition root
│   │
│   ├── config/                 # Validación y carga de env vars
│   │
│   ├── common/                 # Infraestructura transversal NestJS
│   │   ├── decorators/         # @CurrentUser, @Roles, @Public
│   │   ├── exceptions/         # Excepciones de dominio mapeables a HTTP
│   │   ├── filters/            # Global exception filter
│   │   ├── guards/             # Auth guard, Roles guard
│   │   ├── interceptors/       # Logging, audit, transform response
│   │   ├── pipes/              # Validation pipe, Zod pipe
│   │   └── middleware/         # Tenant resolver (preparado)
│   │
│   ├── infrastructure/         # Adaptadores externos
│   │   ├── prisma/             # PrismaService + módulo global
│   │   ├── clerk/              # ClerkService (verify token)
│   │   ├── logger/             # Pino config
│   │   └── audit/              # Audit log writer
│   │
│   ├── modules/                # Bounded contexts
│   │   ├── iam/
│   │   │   ├── domain/         # Entities, VOs, repos (interfaces), errors
│   │   │   ├── application/    # Use cases, DTOs, ports
│   │   │   ├── infrastructure/ # Implementaciones Prisma de repos
│   │   │   └── presentation/   # Controllers, request/response DTOs
│   │   ├── tools/
│   │   ├── materials/
│   │   ├── machines/
│   │   ├── maintenance/
│   │   ├── providers/
│   │   └── audit/
│   │
│   └── health/                 # Health checks (Postgres, app)
│
└── test/                       # E2E tests
```

## Reglas de arquitectura

1. **`domain/` es puro.** No depende de NestJS, Prisma ni Clerk. Solo TypeScript.
2. **`application/` depende solo de `domain/`.** Recibe puertos (interfaces) por DI.
3. **`infrastructure/` implementa los puertos** definidos en `domain/`/`application/`.
4. **`presentation/` solo orquesta**: parsea HTTP, valida con Zod/class-validator, llama a un Use Case, formatea respuesta.
5. **Cada módulo es autónomo** — no importar `prisma` ni `clerk` desde `presentation/`.
6. **Auditoría** se activa con el decorador `@Audited(action, entity)` o automáticamente vía `AuditInterceptor` cuando se aplica al controller.

## Comandos

```bash
pnpm install
pnpm prisma:migrate          # crear/aplicar migraciones en dev
pnpm prisma:seed             # cargar datos iniciales
pnpm dev                     # nest start --watch
pnpm test                    # unit tests
pnpm test:e2e                # integration / e2e
pnpm typecheck               # tsc --noEmit
pnpm lint                    # eslint --fix
```

## API

- Prefix: `/api/v1` (versioning configurable via env).
- Health: `/health`
- Docs (Swagger): `/api/docs` (solo en `NODE_ENV !== 'production'`).
- Autenticación: header `Authorization: Bearer <clerk-session-jwt>`.

## Multi-tenant (preparado, no activo)

El schema tiene `tenantId` nullable en todas las entidades, y existe un middleware `tenant.middleware.ts` listo para activar cuando se setee `MULTI_TENANT_ENABLED=true`.
