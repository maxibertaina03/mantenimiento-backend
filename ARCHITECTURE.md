# 🏗️ Arquitectura Backend - Mantenimiento2

Guía completa de la estructura DDD (Domain-Driven Design) implementada en el backend.

## 📐 Estructura General

```
src/
├── config/                          # Configuración centralizada
│   └── app.config.ts
├── common/                          # Código compartido de todas partes
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── pipes/
│   └── exceptions/
├── infrastructure/                  # Infraestructura transversal
│   ├── prisma/
│   ├── clerk/
│   ├── logger/
│   ├── audit/
│   └── cache/
├── shared/                          # Compartido entre módulos
│   ├── dtos/
│   │   ├── common/                  # Paginación, respuesta, filtros
│   │   └── enums/
│   ├── types/
│   ├── utils/
│   ├── api/
│   └── hooks/
└── modules/                         # Bounded Contexts (DDD)
    ├── machines/
    ├── tools/
    ├── materials/
    ├── maintenance/
    ├── providers/
    ├── iam/
    ├── audit/
    └── dashboard/
```

## 🎯 Estructura de Cada Módulo (Bounded Context)

```
src/modules/{MODULE}/
├── domain/                          # CAPA DE DOMINIO (Lógica pura de negocio)
│   ├── entities/
│   │   └── {entity}.entity.ts       # Entidad de dominio con invariantes
│   ├── value-objects/
│   │   └── {value}.value-object.ts  # Objetos de valor inmutables
│   ├── repositories/
│   │   └── {entity}.repository.ts   # Interfaz de persistencia (contrato)
│   ├── services/
│   │   └── {domain}.service.ts      # Lógica de negocio compleja
│   └── exceptions/
│       └── {domain}.exceptions.ts   # Excepciones de dominio específicas
│
├── application/                     # CAPA DE APLICACIÓN (Orquestación)
│   ├── use-cases/
│   │   ├── create-{entity}/
│   │   │   ├── create-{entity}.use-case.ts
│   │   │   ├── create-{entity}.input.ts
│   │   │   └── create-{entity}.output.ts
│   │   ├── list-{entities}/
│   │   ├── update-{entity}/
│   │   └── delete-{entity}/
│   ├── dtos/
│   │   ├── {entity}.input.dto.ts    # Entrada a use cases
│   │   └── {entity}.output.dto.ts   # Salida de use cases
│   ├── mappers/
│   │   └── {entity}.mapper.ts       # Mapear entre capas
│   └── services/
│       └── {entity}.app-service.ts  # Servicios de aplicación
│
├── infrastructure/                  # CAPA DE INFRAESTRUCTURA (Persistencia)
│   ├── repositories/
│   │   └── prisma-{entity}.repository.ts  # Implementación de repositorio
│   ├── persistence/
│   │   └── {entity}.schema.ts       # Esquema de persistencia (Prisma)
│   └── mappers/
│       └── prisma-{entity}.mapper.ts # Mapear Entity ↔ Prisma Model
│
├── presentation/                    # CAPA DE PRESENTACIÓN (API REST)
│   ├── controllers/
│   │   └── {entity}.controller.ts   # Endpoints HTTP
│   ├── dtos/
│   │   ├── create-{entity}.request.dto.ts
│   │   ├── update-{entity}.request.dto.ts
│   │   └── {entity}.response.dto.ts
│   ├── middlewares/
│   │   ├── {entity}-validation.middleware.ts
│   │   └── {entity}-auth.middleware.ts
│   ├── routes/
│   │   └── {entity}.routes.ts       # Definición de rutas
│   ├── decorators/
│   │   └── {entity}.decorators.ts   # Decoradores personalizados
│   └── pipes/
│       └── {entity}-validation.pipe.ts
│
└── {module}.module.ts               # Módulo NestJS que une todo
```

## 📊 Flujo de Datos (Request → Response)

```
┌─────────────────────────────────────────────────────────────┐
│                    1. PRESENTATION LAYER                     │
│  HTTP Request → Controller → Validate (Pipe) → Use Case Input│
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   2. APPLICATION LAYER                       │
│  Use Case (Orquestación) → Domain Service → Repository Call │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   3. DOMAIN LAYER                            │
│   Entity (Lógica de Negocio) → Invariantes → Valor Objects │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                4. INFRASTRUCTURE LAYER                       │
│     Repository → Prisma Mapper → Database (PostgreSQL)      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                (Database Operation)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              5. RESPONSE (Inverse Flow)                      │
│  DB Model → Entity Mapper → DTO Mapper → HTTP Response 200  │
└─────────────────────────────────────────────────────────────┘
```

## 🏛️ Capas Explicadas

### 1. DOMAIN (src/modules/{module}/domain/)

**Responsabilidad:** Lógica pura de negocio sin dependencias externas.

```typescript
// entities/machine.entity.ts - Entidad con invariantes
export class Machine {
  private id: string;
  private code: string;
  private status: MachineStatus;

  constructor(id: string, code: string) {
    if (!code || code.length < 3) {
      throw new InvalidMachineCodeException();
    }
    this.id = id;
    this.code = code;
  }

  // Operación de negocio que respeta invariantes
  changeStatus(newStatus: MachineStatus): void {
    if (this.status === MachineStatus.ON_LOAN) {
      throw new CannotChangeStatusOnLoanException();
    }
    this.status = newStatus;
  }
}

// repositories/machine.repository.ts - Contrato (interfaz)
export interface IMachineRepository {
  save(machine: Machine): Promise<void>;
  findById(id: string): Promise<Machine | null>;
  findByCode(code: string): Promise<Machine | null>;
}
```

**Características:**
- ✅ Sin dependencias de NestJS, Prisma, o frameworks externos
- ✅ Lógica de negocio pura (invariantes, validaciones)
- ✅ Excepciones específicas del dominio
- ✅ Fácil de testear (unit tests sin mocks complejos)

### 2. APPLICATION (src/modules/{module}/application/)

**Responsabilidad:** Orquestación entre dominio e infraestructura.

```typescript
// use-cases/create-machine/create-machine.use-case.ts
@Injectable()
export class CreateMachineUseCase {
  constructor(
    @Inject(MACHINE_REPOSITORY)
    private readonly repository: IMachineRepository,
    private readonly auditWriter: AuditWriter,
  ) {}

  async execute(input: CreateMachineInput): Promise<CreateMachineOutput> {
    // 1. Crear entidad de dominio
    const machine = new Machine(
      generateUUID(),
      input.code,
      input.name,
    );

    // 2. Aplicar lógica de negocio
    machine.validate();

    // 3. Persistir mediante repositorio
    await this.repository.save(machine);

    // 4. Auditar
    await this.auditWriter.write({
      action: AuditAction.CREATE,
      entityType: 'Machine',
      entityId: machine.id,
    });

    // 5. Retornar DTO de salida
    return {
      id: machine.id,
      code: machine.code,
    };
  }
}
```

**Características:**
- ✅ Orquesta domain services y repositories
- ✅ Inyecta dependencias (principio de inversión)
- ✅ Un use case = una acción de negocio
- ✅ Mapea entrada/salida mediante DTOs

### 3. INFRASTRUCTURE (src/modules/{module}/infrastructure/)

**Responsabilidad:** Persistencia e implementación técnica.

```typescript
// repositories/prisma-machine.repository.ts - Implementación concreta
@Injectable()
export class PrismaMachineRepository implements IMachineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(machine: Machine): Promise<void> {
    const data = PrismaMachineMapper.toPersistence(machine);
    await this.prisma.machine.upsert({
      where: { id: machine.id },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<Machine | null> {
    const raw = await this.prisma.machine.findUnique({
      where: { id },
    });
    return raw ? PrismaMachineMapper.toDomain(raw) : null;
  }
}

// mappers/prisma-machine.mapper.ts
export class PrismaMachineMapper {
  static toDomain(raw: PrismaModel): Machine {
    return new Machine(raw.id, raw.code, raw.name);
  }

  static toPersistence(machine: Machine): PrismaInput {
    return {
      id: machine.id,
      code: machine.code,
      name: machine.name,
    };
  }
}
```

**Características:**
- ✅ Implementa interfaces del dominio
- ✅ Maneja mapeos Domain ↔ DB
- ✅ Transacciones y queries complejas
- ✅ Independiente de la presentación

### 4. PRESENTATION (src/modules/{module}/presentation/)

**Responsabilidad:** Exponer API REST y validar entrada.

```typescript
// controllers/machine.controller.ts
@Controller('machines')
@UseGuards(ClerkAuthGuard)
@UseInterceptors(AuditInterceptor)
export class MachineController {
  constructor(
    private readonly createMachine: CreateMachineUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateMachineRequestDto): Promise<MachineResponseDto> {
    const output = await this.createMachine.execute({
      code: dto.code,
      name: dto.name,
    });
    return MachinePresenterMapper.toResponse(output);
  }
}

// dtos/create-machine.request.dto.ts - Validación de entrada
export class CreateMachineRequestDto {
  @IsString()
  @MinLength(3)
  code: string;

  @IsString()
  @MaxLength(100)
  name: string;
}

// dtos/machine.response.dto.ts - Formato de salida
export class MachineResponseDto {
  id: string;
  code: string;
  name: string;
  status: MachineStatus;
  createdAt: Date;
}
```

**Características:**
- ✅ Controllers NestJS
- ✅ DTOs con validación (class-validator)
- ✅ Decoradores personalizados
- ✅ Middlewares y pipes

### 5. SHARED DTOs (src/shared/dtos/)

**Responsabilidad:** DTOs comunes reutilizables.

```typescript
// common/pagination.dto.ts
export class PaginationDto {
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.ASC;
}

// common/api-response.dto.ts
export class ApiResponseDto<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: Date;
  requestId: string;
}

// common/filter.dto.ts
export class FilterDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsArray()
  @IsOptional()
  filters?: Array<{ field: string; operator: string; value: any }>;
}
```

## 📋 DTOs por Capa

### Use Case DTOs (Application)
```
CreateMachineInput {
  code: string;
  name: string;
}

CreateMachineOutput {
  id: string;
  code: string;
}
```

### Request/Response DTOs (Presentation)
```
CreateMachineRequestDto {
  code: string;
  name: string;
}

MachineResponseDto {
  id: string;
  code: string;
  status: MachineStatus;
  createdAt: Date;
}
```

## 🔄 Mappers (Transformación entre capas)

```
Entity → PrismaMachineMapper → Prisma Model (Persistencia)
Prisma Model → PrismaMachineMapper → Entity (Lectura)
Use Case Output → MachinePresenterMapper → Response DTO (API)
Request DTO → CreateMachineMapper → Use Case Input
```

## 📝 Middlewares

```
src/modules/{module}/presentation/middlewares/
├── {entity}-validation.middleware.ts    # Validación específica
├── {entity}-auth.middleware.ts          # Autorización por rol
├── {entity}-rate-limit.middleware.ts    # Rate limiting
└── {entity}-cache.middleware.ts         # Cache de respuestas
```

## 🚪 Routes

```typescript
// src/modules/machines/presentation/routes/machine.routes.ts
export const machineRoutes: Routes = [
  {
    path: 'machines',
    children: [
      { path: '', method: 'GET', handler: MachineController.list },
      { path: '', method: 'POST', handler: MachineController.create },
      { path: ':id', method: 'GET', handler: MachineController.getById },
      { path: ':id', method: 'PATCH', handler: MachineController.update },
      { path: ':id', method: 'DELETE', handler: MachineController.delete },
    ],
  },
];
```

## ✅ Ventajas de esta Arquitectura

| Aspecto | Beneficio |
|---------|-----------|
| **Testabilidad** | Lógica de negocio testeable sin BD |
| **Mantenibilidad** | Cambios aislados a capas específicas |
| **Escalabilidad** | Fácil agregar nuevos módulos |
| **Independencia** | Domain no depende de frameworks |
| **Reutilización** | DTOs comunes compartidos |
| **Claridad** | Responsabilidades bien definidas |

## 🔍 Ejemplo Completo: Crear una Máquina

### 1. Request llega al Controller
```http
POST /machines HTTP/1.1
Content-Type: application/json

{
  "code": "TORNO-001",
  "name": "Torno CNC"
}
```

### 2. Controller valida y llama Use Case
```typescript
@Post()
async create(@Body() dto: CreateMachineRequestDto) {
  return await this.createMachine.execute({
    code: dto.code,
    name: dto.name,
  });
}
```

### 3. Use Case crea Entity y persiste
```typescript
const machine = new Machine(uuid(), input.code, input.name);
await this.repository.save(machine); // Interfaz del dominio
```

### 4. Repository implementación guarda en BD
```typescript
const data = PrismaMachineMapper.toPersistence(machine);
await this.prisma.machine.create({ data });
```

### 5. Response retorna al cliente
```json
{
  "id": "abc-123",
  "code": "TORNO-001",
  "name": "Torno CNC",
  "status": "OPERATIONAL",
  "createdAt": "2026-05-27T12:00:00Z"
}
```

---

**Esta arquitectura garantiza código limpio, testeable y escalable.** 🚀
