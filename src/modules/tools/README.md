# Bounded Context · Tools

Herramientas con **identidad individual** (sin stock). Cada herramienta tiene un código único, estado y un historial de préstamos.

## Estados

`AVAILABLE` · `ON_LOAN` · `IN_REPAIR` · `OUT_OF_SERVICE`

## Invariantes

- No se puede prestar una herramienta que no esté `AVAILABLE`.
- Toda transición de estado queda auditada (`AuditAction.STATE_CHANGE`).
- El responsable de un préstamo activo se mantiene en `Tool.currentLoan` (vista derivada).

## Estructura prevista

```
tools/
├── domain/
│   ├── tool.entity.ts
│   ├── tool-loan.entity.ts
│   ├── tool.repository.ts
│   └── tool-loan.repository.ts
├── application/
│   ├── register-tool.use-case.ts
│   ├── loan-tool.use-case.ts
│   ├── return-tool.use-case.ts
│   ├── change-status.use-case.ts
│   └── list-tools.use-case.ts
├── infrastructure/
│   ├── prisma-tool.repository.ts
│   └── prisma-tool-loan.repository.ts
└── presentation/
    ├── tools.controller.ts
    ├── create-tool.dto.ts
    ├── loan-tool.dto.ts
    └── tool-response.dto.ts
```
