# Mantenimiento2 - Guía de instalación

Esta guía documenta el proceso completo para clonar el repositorio en una PC nueva y dejar el sistema funcionando end-to-end.

## Requisitos previos

| Software | Versión mínima | Descarga |
|----------|---------------|----------|
| Node.js | 20.x | https://nodejs.org |
| pnpm | 9.x | `npm install -g pnpm` |
| Docker Desktop | última | https://www.docker.com/products/docker-desktop |
| Git | 2.x | https://git-scm.com |

Cuenta gratuita en [Clerk](https://clerk.com) para autenticación.

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPO> Mantenimiento2
cd Mantenimiento2
```

Si el repo tiene submódulos (backend/frontend separados):

```bash
git submodule update --init --recursive
```

## 2. Configurar variables de entorno

### 2.1. Backend (`backend/.env`)

Crear `backend/.env` con el siguiente contenido:

```env
# Runtime
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
API_PREFIX=api
API_VERSION=1

# CORS - Origenes permitidos del frontend
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Logging
LOG_LEVEL=debug

# Database - PostgreSQL en Docker (puerto 5433)
DATABASE_URL=postgresql://cmms_user:cmms_password@127.0.0.1:5433/postgres?schema=public

# Clerk (https://dashboard.clerk.com)
CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXX
CLERK_JWT_ISSUER=https://YOUR-INSTANCE.clerk.accounts.dev

# Rate limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# Multi-tenant (preparado, no activo)
MULTI_TENANT_ENABLED=false
```

### 2.2. Frontend (`frontend/.env`)

Crear `frontend/.env` con:

```env
# API
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_API_PROXY_TARGET=http://localhost:3000

# Clerk - misma instancia que el backend
VITE_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXX
VITE_CLERK_SIGN_IN_URL=/sign-in
VITE_CLERK_SIGN_UP_URL=/sign-up
VITE_CLERK_AFTER_SIGN_IN_URL=/dashboard
VITE_CLERK_AFTER_SIGN_UP_URL=/dashboard

# App
VITE_APP_NAME=Mantenimiento2
VITE_APP_ENV=development
```

### 2.3. Configurar Clerk

1. Ir a https://dashboard.clerk.com y crear una nueva aplicación.
2. **User & Authentication > Email, Phone, Username**: deshabilitar email y phone, **habilitar solo username**.
3. **User & Authentication > Restrictions**: deshabilitar sign-up público (sistema interno).
4. Copiar las keys desde el dashboard:
   - `Publishable key` → `VITE_CLERK_PUBLISHABLE_KEY` y `CLERK_PUBLISHABLE_KEY`
   - `Secret key` → `CLERK_SECRET_KEY`
   - JWT issuer → `CLERK_JWT_ISSUER` (formato: `https://your-app.clerk.accounts.dev`)

## 3. Levantar la base de datos

### Opción A: Docker Compose (recomendado)

```bash
docker run -d \
  --name cmms_postgres \
  -e POSTGRES_USER=cmms_user \
  -e POSTGRES_PASSWORD=cmms_password \
  -e POSTGRES_DB=postgres \
  -p 5433:5432 \
  postgres:16-alpine
```

### Opción B: PostgreSQL local

Si tenés Postgres instalado, crear la BD y usuario:

```sql
CREATE USER cmms_user WITH PASSWORD 'cmms_password';
CREATE DATABASE postgres OWNER cmms_user;
```

Y actualizar `DATABASE_URL` en `backend/.env` con el puerto correcto (5432 default).

### Habilitar extension citext

El schema usa el tipo `CITEXT` (case-insensitive text). Hay que habilitarlo:

```bash
docker exec cmms_postgres psql -U cmms_user -d postgres -c "CREATE EXTENSION IF NOT EXISTS citext;"
```

## 4. Instalar dependencias

```bash
# Backend
cd backend
pnpm install

# Frontend (otra terminal o despues)
cd ../frontend
pnpm install
```

## 5. Aplicar migraciones y seed

```bash
cd backend

# Aplicar migraciones de Prisma
pnpm prisma migrate deploy

# Generar el cliente Prisma
pnpm prisma generate

# Poblar la BD con datos de prueba
pnpm prisma db seed
```

El seed crea:
- 1 usuario admin (username: `admin`, role: `ADMIN`)
- 4 máquinas (Torno, Fresadora, Taladro, Rectificadora)
- 5 herramientas (Llaves, Taladros, etc.)
- 5 materiales (Aceite, Rodamientos, etc.)
- 4 proveedores
- 4 órdenes de mantenimiento

## 6. Crear usuario en Clerk para el login

1. Ir a https://dashboard.clerk.com > Users > Create user
2. Crear un usuario con `username: admin` (debe coincidir con el del seed para que se reconcilien)
3. Establecer una password

Al hacer login con ese usuario, el backend reconcilia automáticamente el `clerk_user_id` con el row del admin de seed.

Si el usuario se crea con un username distinto, se creará un nuevo row con rol `OPERATOR`. Para promoverlo:

```bash
docker exec cmms_postgres psql -U cmms_user -d postgres \
  -c "UPDATE users SET role = 'ADMIN' WHERE username = 'TU_USERNAME';"
```

## 7. Levantar el sistema

En **dos terminales separadas**:

```bash
# Terminal 1 - Backend
cd backend
pnpm dev
```

```bash
# Terminal 2 - Frontend
cd frontend
pnpm dev
```

## 8. Verificar que todo funcione

| URL | Qué verificar |
|-----|---------------|
| http://localhost:3000/api/v1/docs | Swagger UI con todos los endpoints |
| http://localhost:3000/health | Health check del backend |
| http://localhost:5173 | Frontend - redirige a /sign-in |

### Flujo de login

1. Abrir http://localhost:5173
2. Te redirige a `/sign-in`
3. Loguearte con el username y password creados en Clerk
4. Te redirige al `/dashboard` con los KPIs del sistema
5. Navegar entre Máquinas, Materiales, Herramientas, Proveedores, Mantenimientos

## Troubleshooting

### "Can't reach database server at 127.0.0.1:5434"
El puerto correcto es **5433**, no 5434. Verificar `DATABASE_URL` en `backend/.env`.

### "type citext does not exist"
Falta habilitar la extension:
```bash
docker exec cmms_postgres psql -U cmms_user -d postgres -c "CREATE EXTENSION IF NOT EXISTS citext;"
```

### "Authentication failed against database server"
Credenciales incorrectas. Verificar que `DATABASE_URL` use `cmms_user:cmms_password` (o las que hayas configurado en el contenedor).

### Frontend muestra "Cargando autenticación" indefinidamente
La key de Clerk está mal configurada. Verificar:
- `VITE_CLERK_PUBLISHABLE_KEY` en `frontend/.env`
- Que la key sea `pk_test_...` (development) o `pk_live_...` (production)

### Las páginas no muestran datos pero el dashboard sí
Verificar que el backend esté corriendo y que el token de Clerk se envíe correctamente. Abrir DevTools > Network y buscar requests a `/api/v1/...` - deberían tener `Authorization: Bearer ...` en los headers.

### Los `Decimal` aparecen como `{s, e, d}` en el frontend
El `TransformResponseInterceptor` debería convertir automáticamente. Si no funciona, verificar que el backend levantó después del último commit.

## Estructura del proyecto

```
Mantenimiento2/
├── backend/                    # API NestJS
│   ├── prisma/                 # Schema y migraciones
│   ├── src/
│   │   ├── common/             # Decorators, guards, interceptors
│   │   ├── config/             # Configuración del app
│   │   ├── infrastructure/     # Clerk, Prisma, Logger
│   │   └── modules/            # Bounded contexts (DDD)
│   │       ├── iam/
│   │       ├── machines/
│   │       ├── materials/
│   │       ├── tools/
│   │       ├── providers/
│   │       ├── maintenance/
│   │       ├── audit/
│   │       └── dashboard/
│   └── .env
├── frontend/                   # React + Vite SPA
│   ├── src/
│   │   ├── app/                # Providers, router
│   │   ├── pages/              # Páginas (route components)
│   │   ├── features/           # Feature modules (hooks + UI)
│   │   ├── widgets/            # Componentes compuestos (sidebar, header)
│   │   ├── shared/             # API, types, UI base, utils
│   │   └── entities/           # Entidades de dominio (badges, etc)
│   └── .env
├── docker-compose.yml
└── SETUP.md                    # Esta guía
```

## Arquitectura backend

Cada módulo bounded context sigue el patrón **DDD + Clean Architecture** en 5 capas:

```
modules/<context>/
├── domain/
│   ├── entities/               # Entidades de dominio puras
│   ├── value-objects/          # VOs (enums, validaciones)
│   ├── repositories/           # Interfaces de repositorio
│   └── exceptions/             # Excepciones de dominio
├── application/
│   ├── dtos/                   # Inputs y outputs de use cases
│   ├── mappers/                # Entity → DTO
│   └── use-cases/              # Casos de uso (lógica de negocio)
├── infrastructure/
│   ├── mappers/                # Prisma model → Entity
│   └── repositories/           # Implementaciones Prisma
├── presentation/
│   ├── dtos/                   # DTOs HTTP (request/response)
│   ├── mappers/                # App output → HTTP response
│   └── controllers/            # Controllers NestJS
└── <context>.module.ts         # Wiring DI
```

## Endpoints principales

Todos requieren `Authorization: Bearer <clerk_jwt>` excepto `/health`.

| Endpoint | Descripción |
|----------|-------------|
| `GET /api/v1/iam/users/me` | Usuario actual |
| `GET /api/v1/dashboard/stats` | KPIs agregados |
| `GET /api/v1/machines` | Listado de máquinas |
| `GET /api/v1/maintenance-orders` | Órdenes de mantenimiento |
| `GET /api/v1/tools` | Herramientas |
| `GET /api/v1/materials` | Materiales |
| `GET /api/v1/providers` | Proveedores |
| `GET /api/v1/audit-logs` | Logs de auditoría |

Ver Swagger en http://localhost:3000/api/v1/docs para la lista completa.

## Recursos

- [Documentación NestJS](https://docs.nestjs.com)
- [Documentación Prisma](https://www.prisma.io/docs)
- [Documentación Clerk](https://clerk.com/docs)
- [TanStack Router](https://tanstack.com/router)
- [shadcn/ui](https://ui.shadcn.com)
