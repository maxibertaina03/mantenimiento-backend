# 🚀 Guía de Setup - Mantenimiento2

Instrucciones completas para clonar y ejecutar el sistema Mantenimiento2 desde cero en tu máquina.

## 📋 Requisitos Previos

- **Node.js** ≥ 20.0.0 ([Descargar](https://nodejs.org/))
- **pnpm** ≥ 9.0.0 (`npm install -g pnpm`)
- **Docker Desktop** ([Descargar](https://www.docker.com/products/docker-desktop))
- **Git** ([Descargar](https://git-scm.com/))
- Cuenta en **Clerk** ([https://clerk.com](https://clerk.com)) - Gratuito

## 📂 Paso 1: Clonar Repositorios

```powershell
# En tu carpeta de proyectos
git clone https://github.com/maxibertaina03/mantenimiento-backend.git
git clone https://github.com/maxibertaina03/mantenimiento-frontend.git

# Navega a la carpeta del backend
cd mantenimiento-backend
```

## 🗄️ Paso 2: Configurar Base de Datos con Docker

### Opción A: Usar Docker (Recomendado)

```powershell
# Inicia PostgreSQL en Docker
docker run -d `
  --name mantenimiento2-postgres `
  -e POSTGRES_USER=mantenimiento `
  -e POSTGRES_PASSWORD=mantenimiento `
  -e POSTGRES_DB=mantenimiento `
  -p 5434:5432 `
  postgres:16-alpine
```

**Espera 5 segundos para que PostgreSQL inicie**, luego:

```powershell
# Habilita la extensión CITEXT necesaria
docker exec mantenimiento2-postgres psql -U mantenimiento -d mantenimiento -c "CREATE EXTENSION IF NOT EXISTS citext"
```

### Opción B: PostgreSQL Local (Windows)

Si tienes PostgreSQL instalado localmente:
1. Crea una base de datos llamada `mantenimiento`
2. Crea un usuario `mantenimiento` con password `mantenimiento`
3. Ejecuta: `CREATE EXTENSION IF NOT EXISTS citext;`

## 🔧 Paso 3: Configurar Variables de Entorno

### Backend

En `backend/`, copia `.env.example` → `.env`:

```bash
cp .env.example .env
```

Edita `backend/.env` y **reemplaza** las variables de Clerk:

```env
# Obtén estos valores de https://dashboard.clerk.com
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_JWT_ISSUER=https://tu-tenant.clerk.accounts.dev

# Si usas Docker en puerto 5434, cambia:
DATABASE_URL=postgresql://mantenimiento:mantenimiento@127.0.0.1:5434/mantenimiento?schema=public

# Si usas PostgreSQL local en puerto 5432:
# DATABASE_URL=postgresql://mantenimiento:mantenimiento@localhost:5432/mantenimiento?schema=public
```

### Frontend

En `frontend/`, crea `.env`:

```bash
cd ../mantenimiento-frontend
```

Copia `.env.example` → `.env`:

```bash
cp .env.example .env
```

Edita `frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx  # El MISMO que en backend
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## 📦 Paso 4: Instalar Dependencias

### Backend

```powershell
cd ../mantenimiento-backend
pnpm install
```

### Frontend

```powershell
cd ../mantenimiento-frontend
pnpm install
```

## 🗃️ Paso 5: Base de Datos - Migrations y Seed

Desde `backend/`:

```powershell
# Ejecutar migraciones
pnpm prisma:migrate

# Ejecutar seed (carga datos de prueba)
pnpm prisma:seed
```

**Espera a que ambos comandos terminen.** El seed crea:
- 1 usuario admin
- 4 máquinas
- 5 herramientas
- 5 materiales
- 4 proveedores
- 4 órdenes de mantenimiento

## 🔐 Paso 6: Configurar Admin en Clerk

1. Ve a [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. En **Users**, crea un usuario:
   - **Username:** `admin`
   - **Password:** Tu contraseña segura (ej: `Lac122Tres`)
3. Copia su **User ID** (empieza con `user_`)

## 🗄️ Paso 7: Sincronizar Admin con Base de Datos

1. Desde `backend/`, abre Prisma Studio:

```powershell
pnpm prisma:studio
```

2. Se abre en `http://localhost:5555`
3. Ve a la tabla `users`
4. Busca el usuario `admin`
5. En el campo `clerk_user_id`, pega el User ID que copiaste de Clerk
6. Clickea "Save"

## ▶️ Paso 8: Iniciar Aplicación

### Terminal 1: Backend

```powershell
cd mantenimiento-backend
pnpm dev
```

Espera a ver `Nest application successfully started` y que mapee todas las rutas.

### Terminal 2: Frontend

```powershell
cd mantenimiento-frontend
pnpm dev
```

Espera a ver:
```
✜  Local:   http://localhost:5173/
```

## 🎯 Paso 9: Usar la Aplicación

1. Abre **http://localhost:5173**
2. Clickea "Iniciar Sesión"
3. Ingresa:
   - **Usuario:** `admin`
   - **Contraseña:** La que creaste en Clerk
4. ✅ **¡Listo!** Deberías ver el dashboard con datos de prueba

## 🛠️ Comandos Útiles

### Backend

```powershell
# Desarrollo con auto-reload
pnpm dev

# Compilar para producción
pnpm build

# Ejecutar en producción
pnpm start:prod

# Abrir Prisma Studio (GUI para BD)
pnpm prisma:studio

# Ver migraciones
pnpm prisma migrate status

# Crear nueva migración
pnpm prisma migrate dev --name nombre_migracion

# Limpiar BD y re-seedear
# ⚠️ CUIDADO: Borra todos los datos
pnpm prisma migrate reset
```

### Frontend

```powershell
# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview de build
pnpm preview

# Lint y format
pnpm lint
pnpm format
```

### Docker

```powershell
# Ver logs del postgres
docker logs mantenimiento2-postgres

# Entrar a la terminal de postgres
docker exec -it mantenimiento2-postgres psql -U mantenimiento -d mantenimiento

# Detener postgres
docker stop mantenimiento2-postgres

# Reiniciar postgres
docker start mantenimiento2-postgres

# Eliminar postgres (⚠️ borra datos)
docker rm mantenimiento2-postgres
```

## 🔄 Flujo de Clerk: Username + Password Únicamente

Este sistema usa **Clerk configurado SOLO con username + password**. No tiene email, teléfono ni OAuth.

**Configuración en Clerk Dashboard:**
1. User & Authentication → Email, Phone, Username
   - Email address: **OFF**
   - Phone number: **OFF**
   - Username: **ON** (required)
   - Password: **ON** (required)

2. Social Connections: **TODO OFF**

3. Restrictions:
   - Sign-up mode: **Restricted** (solo invite o admin creation)

## 📊 Datos de Prueba

El seed automático crea:

| Entidad | Cantidad | Detalles |
|---------|----------|----------|
| **Máquinas** | 4 | Torno, Fresadora, Taladro, Rectificadora |
| **Herramientas** | 5 | Llaves, Taladro portátil, Destornilladores, etc. |
| **Materiales** | 5 | Aceite hidráulico, Rodamientos, Correas, Grasa, Filtros |
| **Proveedores** | 4 | Hidraulix, MecánicaPlus, Electrónica Industrial, Repuestos |
| **Mantenimientos** | 4 | Completados, Programados, En progreso |

## ⚠️ Troubleshooting

### "Port 5434 already in use"

```powershell
# Detén el contenedor anterior
docker stop mantenimiento2-postgres

# O usa otro puerto:
docker run -d --name postgres-alt -e POSTGRES_USER=mantenimiento -e POSTGRES_PASSWORD=mantenimiento -e POSTGRES_DB=mantenimiento -p 5435:5432 postgres:16-alpine

# Actualiza DATABASE_URL en .env a puerto 5435
```

### "Cannot GET /api/machines" (404)

Los endpoints requieren autenticación. Primero loguéate en http://localhost:5173

### "VITE_CLERK_PUBLISHABLE_KEY: Required"

Asegúrate de que `frontend/.env` tiene la variable. Recarga la página con F5.

### Backend no inicia - TypeScript errors

```powershell
# Limpia y reinstala
rm -r node_modules .next dist
pnpm install
pnpm dev
```

### BD sin datos después del seed

```powershell
# Re-ejecuta el seed
pnpm prisma:seed

# O resetea todo (⚠️ borra datos)
pnpm prisma migrate reset
```

## 📚 Estructura del Proyecto

```
mantenimiento-backend/
├── src/
│   ├── modules/              # 7 bounded contexts (Machines, Tools, etc)
│   ├── infrastructure/       # Prisma, Clerk, Logger, Audit
│   ├── common/              # Guards, Interceptors, Decorators
│   └── config/              # Configuración centralizada
├── prisma/
│   ├── schema.prisma        # Modelo de datos
│   ├── migrations/          # Historial de cambios
│   └── seed.ts              # Datos iniciales

mantenimiento-frontend/
├── src/
│   ├── features/            # 7 módulos (Tools, Materials, etc)
│   ├── entities/            # Tipos y componentes de entidades
│   ├── pages/               # Páginas por ruta
│   ├── shared/              # API clients, UI, hooks comunes
│   └── app/                 # Router, layouts principales
```

## 🔗 Links Útiles

- **Clerk Dashboard:** https://dashboard.clerk.com
- **Prisma Studio:** http://localhost:5555 (cuando está corriendo)
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/v1
- **GitHub Backend:** https://github.com/maxibertaina03/mantenimiento-backend
- **GitHub Frontend:** https://github.com/maxibertaina03/mantenimiento-frontend

## 📝 Notas

- **Tenant:** Multi-tenant preparado pero NO activo (todos los datos en tenant `null`)
- **Auditoría:** Toda acción se registra automáticamente
- **Versionado API:** v1 (configurable en `.env`)
- **TypeScript:** Strict mode activado

## 🎓 Siguientes Pasos

1. ✅ Loguéate y prueba todas las pantallas
2. ✅ Crea nuevas máquinas/herramientas/materiales
3. ✅ Programa mantenimientos
4. ✅ Realiza movimientos de stock
5. ✅ Chequea el módulo de Auditoría para ver logs

---

**¿Necesitas ayuda?** Chequea los logs en las terminales del backend y frontend para errores específicos.
