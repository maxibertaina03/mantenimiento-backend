# 🛠️ Guía de Implementación DDD - Módulo Providers

Este documento muestra la **implementación completa del módulo Providers** siguiendo la arquitectura DDD documentada en `ARCHITECTURE.md`. Este módulo sirve como **template** para implementar los otros 7 bounded contexts.

## 📂 Estructura Implementada

```
src/modules/providers/
├── domain/
│   ├── entities/
│   │   └── provider.entity.ts              ✅ Entidad con invariantes
│   ├── value-objects/
│   │   └── provider-status.vo.ts           ✅ Value Object (ACTIVE/INACTIVE)
│   ├── repositories/
│   │   └── provider.repository.ts          ✅ Interfaz (contrato)
│   └── exceptions/
│       ├── invalid-provider.exception.ts   ✅ Excepciones de dominio
│       └── provider-not-found.exception.ts ✅ Excepciones específicas
│
├── application/
│   ├── use-cases/
│   │   └── create-provider/
│   │       ├── create-provider.use-case.ts ✅ Orquestación
│   │       ├── create-provider.input.ts    ✅ DTO entrada
│   │       └── create-provider.output.ts   ✅ DTO salida
│   ├── dtos/
│   │   ├── create-provider.input.ts
│   │   └── create-provider.output.ts
│   └── mappers/
│       └── provider-app.mapper.ts          ✅ Entity → AppDTO
│
├── infrastructure/
│   ├── repositories/
│   │   └── prisma-provider.repository.ts   ✅ Implementación Prisma
│   └── mappers/
│       └── prisma-provider.mapper.ts       ✅ Entity ↔ PrismaModel
│
├── presentation/
│   ├── controllers/
│   │   └── providers.controller.ts         ✅ Endpoints HTTP
│   ├── dtos/
│   │   ├── create-provider.request.dto.ts  ✅ DTO request
│   │   └── provider.response.dto.ts        ✅ DTO response
│   ├── pipes/
│   │   └── create-provider-validation.pipe.ts ✅ Validación custom
│   └── mappers/
│       └── provider-presenter.mapper.ts    ✅ AppDTO → ResponseDTO
│
└── providers.module.ts                     ✅ NestJS Module integrador
```

## 🔄 Flujo de Datos Implementado

### Ejemplo: CREATE PROVIDER

```
1. HTTP REQUEST
   POST /providers
   {
     "name": "Hidraulix S.A.",
     "email": "info@hidraulix.com"
   }
        ↓
2. PRESENTATION LAYER
   → Controller recibe request
   → CreateProviderValidationPipe valida estructura
   → ValidationPipe (class-validator) valida decoradores
        ↓
3. APPLICATION LAYER
   → CreateProviderUseCase.execute(input)
   → Crea entity: new Provider(uuid, input.name, ...)
   → Valida invariantes: findByName() para duplicados
   → Persiste: repository.save(provider)
        ↓
4. INFRASTRUCTURE LAYER
   → PrismaProviderRepository.save(provider)
   → PrismaProviderMapper.toPersistence(provider)
   → prisma.provider.upsert({...})
        ↓
5. DATABASE
   → PostgreSQL INSERT/UPDATE
        ↓
6. RESPONSE (Inverse Flow)
   → ProviderPresenterMapper.toResponse(output)
   → HTTP 201 Created
   {
     "id": "abc-123",
     "name": "Hidraulix S.A.",
     "status": "ACTIVE",
     "createdAt": "2026-05-27T12:00:00Z"
   }
```

## 📝 Cómo Extender el Módulo

### Agregar un Nuevo Use Case (Ejemplo: UpdateProvider)

#### 1️⃣ Domain Layer

```typescript
// domain/entities/provider.entity.ts (YA EXISTE)
// Solo necesitas agregar método:

changeName(newName: string): void {
  this.validateName(newName);
  this.name = newName;
  this.updatedAt = new Date();
}
```

#### 2️⃣ Application Layer

```typescript
// application/dtos/update-provider.input.ts
export class UpdateProviderInput {
  id: string;
  name?: string;
  email?: string | null;
  // ... otros campos opcionales
}

// application/dtos/update-provider.output.ts
export class UpdateProviderOutput {
  id: string;
  name: string;
  email: string | null;
  updatedAt: Date;
}

// application/use-cases/update-provider/update-provider.use-case.ts
@Injectable()
export class UpdateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly repository: IProviderRepository,
  ) {}

  async execute(input: UpdateProviderInput): Promise<UpdateProviderOutput> {
    // 1. Encontrar
    const provider = await this.repository.findById(input.id);
    if (!provider) {
      throw new ProviderNotFoundException(input.id);
    }

    // 2. Actualizar mediante métodos de la entidad
    if (input.name) {
      provider.changeName(input.name);
    }
    if (input.email !== undefined) {
      provider.updateContactInfo(input.email);
    }

    // 3. Persistir
    await this.repository.save(provider);

    // 4. Retornar
    return ProviderAppMapper.toOutput(provider);
  }
}
```

#### 3️⃣ Presentation Layer

```typescript
// presentation/dtos/update-provider.request.dto.ts
export class UpdateProviderRequestDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string | null;
}

// presentation/controllers/providers.controller.ts (AGREGAR)
@Patch(':id')
async update(
  @Param('id') id: string,
  @Body() dto: UpdateProviderRequestDto,
): Promise<ProviderResponseDto> {
  const output = await this.updateProvider.execute({
    id,
    name: dto.name,
    email: dto.email,
  });
  return ProviderPresenterMapper.toResponse(output);
}

// providers.module.ts (ACTUALIZAR)
@Module({
  // ...
  providers: [
    CreateProviderUseCase,
    UpdateProviderUseCase,  // ← AGREGAR
    // ...
  ],
})
export class ProvidersModule {}
```

## ✅ Checklist para Implementar un Nuevo Módulo

Usar este checklist para **Machines**, **Tools**, **Materials**, **Maintenance**, **IAM**, **Audit**, **Dashboard**:

### Domain Layer
- [ ] Crear `domain/entities/{entity}.entity.ts` con invariantes
- [ ] Crear `domain/value-objects/{entity}-{field}.vo.ts` (status, codes, etc)
- [ ] Crear `domain/repositories/{entity}.repository.ts` (interfaz)
- [ ] Crear `domain/exceptions/{specific}.exception.ts` (mínimo 2-3)

### Application Layer
- [ ] Crear `application/dtos/{action}-{entity}.input.ts`
- [ ] Crear `application/dtos/{action}-{entity}.output.ts`
- [ ] Crear `application/use-cases/{action}-{entity}/{action}-{entity}.use-case.ts`
- [ ] Crear `application/mappers/{entity}-app.mapper.ts`
- [ ] Crear mínimo 5 use cases: Create, List, Get, Update, Delete

### Infrastructure Layer
- [ ] Crear `infrastructure/repositories/prisma-{entity}.repository.ts`
- [ ] Crear `infrastructure/mappers/prisma-{entity}.mapper.ts`
- [ ] Verificar que `schema.prisma` tiene el modelo

### Presentation Layer
- [ ] Crear `presentation/dtos/{action}-{entity}.request.dto.ts`
- [ ] Crear `presentation/dtos/{entity}.response.dto.ts`
- [ ] Crear `presentation/pipes/{entity}-validation.pipe.ts`
- [ ] Crear `presentation/controllers/{entities}.controller.ts`
- [ ] Crear `presentation/mappers/{entity}-presenter.mapper.ts`

### Integration
- [ ] Crear `{module}.module.ts` que importe PrismaModule
- [ ] Exportar use cases necesarios
- [ ] Actualizar `app.module.ts` para importar el nuevo módulo

## 🔍 Patrones Clave

### 1. Validación en Dominio (Entity Constructor)
```typescript
private validateName(name: string): void {
  if (!name || name.trim().length === 0) {
    throw new InvalidProviderException('Name cannot be empty');
  }
  if (name.length > 255) {
    throw new InvalidProviderException('Name exceeds limit');
  }
}
```

### 2. Métodos Getter (Encapsulación)
```typescript
getId(): string { return this.id; }
getName(): string { return this.name; }
getStatus(): ProviderStatus { return this.status; }
```

### 3. Métodos de Operación (Cambios de Estado)
```typescript
changeName(newName: string): void {
  this.validateName(newName);
  this.name = newName;
  this.updatedAt = new Date();
}

activate(): void {
  this.changeStatus(ProviderStatus.ACTIVE);
}
```

### 4. Inyección de Dependencias
```typescript
constructor(
  @Inject(PROVIDER_REPOSITORY)
  private readonly repository: IProviderRepository,
) {}
```

### 5. Validación Multi-capa
```
Request DTO → Pipe → ValidationPipe → UseCase → Entity
  ↓             ↓       ↓              ↓         ↓
Basic format  Custom  class-validator Domain  Invariantes
```

## 🚀 Next Steps

1. **Implementar Machines** (similar a Providers, pero con más lógica de negocio)
2. **Implementar Tools** (con ToolLoans - relación 1:N)
3. **Implementar Materials** (con StockMovements - auditoría)
4. **Implementar Maintenance** (orquestación entre máquinas, herramientas, materiales)
5. **Implementar Providers, IAM, Audit, Dashboard** (siguiendo el mismo patrón)

## 📚 Referencias

- Ver `ARCHITECTURE.md` para detalles teóricos
- Ver `FOLDER_STRUCTURE.txt` para nomenclatura
- Providers module = template para todos los otros módulos
- Cada use case = una acción de negocio atómica

---

**La clave es que Domain NO depende de nada, y todo lo demás depende del Domain a través de interfaces.**
