import { Decimal } from '@prisma/client/runtime/library';

export class UsageLogOutput {
  id!: string;
  machineId!: string;
  hoursBefore!: Decimal;
  hoursAfter!: Decimal;
  delta!: Decimal;
  notes!: string | null;
  createdById!: string;
  createdAt!: Date;
}
