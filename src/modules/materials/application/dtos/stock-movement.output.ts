import { Decimal } from '@prisma/client/runtime/library';
import type { StockMovementType } from './register-movement.input';

export class StockMovementOutput {
  id!: string;
  materialId!: string;
  type!: StockMovementType;
  quantity!: Decimal;
  stockAfter!: Decimal;
  reason!: string | null;
  reference!: string | null;
  createdById!: string;
  createdAt!: Date;
}
