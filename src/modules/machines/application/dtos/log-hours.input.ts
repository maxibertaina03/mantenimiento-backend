import { Decimal } from '@prisma/client/runtime/library';

export class LogHoursInput {
  machineId!: string;
  /** Lectura ACTUAL del contador de horas (no el delta). El use case calcula el delta. */
  hoursAfter!: Decimal;
  notes?: string | null;
  createdById!: string;
  tenantId?: string | null;
}
