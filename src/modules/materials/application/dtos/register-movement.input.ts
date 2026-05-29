import { Decimal } from '@prisma/client/runtime/library';

export type StockMovementType = 'INBOUND' | 'OUTBOUND' | 'ADJUSTMENT' | 'CONSUMPTION';

export class RegisterMovementInput {
  materialId!: string;
  type!: StockMovementType;
  quantity!: Decimal;
  /** Solo aplica cuando type=ADJUSTMENT. 1=suma, -1=resta */
  adjustmentSign?: 1 | -1;
  reason?: string | null;
  reference?: string | null;
  createdById!: string;
  tenantId?: string | null;
}
