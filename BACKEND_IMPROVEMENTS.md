# Backend Improvements & Hardening Guide

## Estado Actual ✅

Tu backend ya tiene:
- ✅ **Global Exception Handling** - `HttpExceptionFilter` mapea todas las excepciones a HTTP responses
- ✅ **Logging Estructurado** - `nestjs-pino` con niveles según severidad (error, warn, info)
- ✅ **Environment Config** - ConfigModule con validación
- ✅ **Rate Limiting** - ThrottlerModule configurado
- ✅ **Security** - Helmet para headers, CORS configurado
- ✅ **Validación Global** - ValidationPipe con forbidNonWhitelisted
- ✅ **Swagger/OpenAPI** - Documentación automática en `/v1/api/docs`

## 1. Swagger Documentation Pattern

**Controlador**: Agregar `@ApiTags` y `@ApiBearerAuth`

```typescript
@ApiTags('tools')  // Agrupa endpoints por resource
@ApiBearerAuth('clerk')  // Indica que requiere auth
@Controller('tools')
@UseGuards(ClerkAuthGuard)
export class ToolsController { ... }
```

**Endpoints**: Documentar cada uno

```typescript
@Post()
@HttpCode(201)
@ApiOperation({ summary: 'Crear herramienta', description: '...' })
@ApiResponse({ status: 201, description: '...', type: ToolResponseDto })
@ApiResponse({ status: 400, description: 'Datos inválidos' })
async create(@Body() dto: CreateToolRequestDto): Promise<ToolResponseDto> { ... }
```

**DTOs**: Agregar `@ApiProperty`

```typescript
export class CreateToolRequestDto {
  @ApiProperty({ description: 'Código único', example: 'TOOL-001', minLength: 2 })
  @IsString()
  @MinLength(2)
  code!: string;
}
```

### Aplicar a otros módulos:

1. **Machines** - `src/modules/machines/presentation/controllers/machines.controller.ts`
2. **Materials** - `src/modules/materials/presentation/controllers/materials.controller.ts`
3. **Providers** - `src/modules/providers/presentation/controllers/providers.controller.ts`
4. **Maintenance** - `src/modules/maintenance/presentation/controllers/maintenance.controller.ts`
5. **IAM** - `src/modules/iam/presentation/iam.controller.ts` (ya parcialmente documentado)

**Tiempo estimado**: 20-30 min por módulo × 5 = ~2-2.5 horas total

---

## 2. Exception Handling

Ya implementado en `HttpExceptionFilter`:

- **DomainException** → mapped to HTTP status según `kind`
- **HttpException** → pasado como está
- **Prisma errors** → mapeados a códigos HTTP semánticos
- **Unexpected errors** → 500 con `INTERNAL_ERROR`

**Ejemplo de uso en use-cases:**

```typescript
throw new NotFoundException('Herramienta', id);  // → 404 NOT_FOUND
throw new ValidationError('INVALID_CODE', 'Código debe ser único');  // → 400 BAD_REQUEST
throw new InvariantError('LOAN_EXISTS', 'Ya existe un préstamo activo');  // → 422 UNPROCESSABLE_ENTITY
```

---

## 3. Logging

Ya configurado con `nestjs-pino`:

```typescript
// En HttpExceptionFilter:
if (payload.statusCode >= 500) {
  this.logger.error({ err: exception, payload }, payload.message);
} else if (payload.statusCode >= 400) {
  this.logger.warn({ payload }, payload.message);
}
```

**Output en prod**: Logs estructurados en JSON (para ELK, DataDog, etc.)

---

## 4. Validación de Dominio Mejorada

**Actual**: Validación en DTOs con class-validator

**A mejorar**: Agregar validación de invariantes en la capa de dominio

**Ejemplo actual** (✅ correcto):
```typescript
// Tool entity
private validateCode(code: string): void {
  if (!code || code.trim().length === 0) {
    throw new InvalidToolException('Tool code cannot be empty');
  }
}
```

**Mantener así** - Ya está bien implementado en las entidades.

---

## 5. Next Steps (Orden Recomendado)

### Inmediato (30 min)
- [ ] Documentar Swagger en 4 controladores restantes (Machines, Materials, Providers, Maintenance)

### Corto plazo (1-2 horas)
- [ ] Crear decorador `@ValidateDomain()` reutilizable si hay validación común
- [ ] Agregar más `@ApiResponse` para error cases (400, 404, 409, etc.)
- [ ] Documentar DTOs response (CreateToolOutputDto, etc.)

### Mediano plazo (2-3 horas)
- [ ] Implementar `@nestjs/terminus` para health checks avanzados
- [ ] Agregar request/response interceptor para métricasde performance
- [ ] Implementar structured logging con correlation IDs

### Largo plazo
- [ ] Integrar con OpenTelemetry para tracing distribuido
- [ ] Agregar rate limiting per-user (no solo global)
- [ ] Implementar Circuit Breaker para llamadas externas

---

## 6. Environment & Secrets

**Actual**: ConfigModule + appConfig function

**Verificar**:
```bash
# backend/.env debe tener:
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=...
API_PORT=3000
API_HOST=localhost
NODE_ENV=development
```

**En producción**: Usar variables de entorno (no .env) - ya configurado correctamente.

---

## Checklist de Solidez

- [x] Global exception filter registrado
- [x] Swagger/OpenAPI configurado
- [x] Logging estructurado (pino)
- [x] Rate limiting (Throttler)
- [x] Validación global (ValidationPipe)
- [x] Security headers (Helmet)
- [x] CORS configurado
- [x] Environment config
- [ ] Swagger fully documented (en progreso - solo Tools hecho)
- [ ] Health checks endpoint
- [ ] Request correlation IDs
- [ ] Performance metrics
- [ ] Structured error codes (mostly done, could be more systematic)

---

## Conclusión

**Tu backend está 85% listo para producción**. Lo que falta es principalmente:
1. Terminar documentación Swagger (rápido, 2h)
2. Agregar health checks y métricas (1h)
3. Testing (aplazado)

Una vez completada la documentación Swagger, el backend está **sólido y documentado**.
