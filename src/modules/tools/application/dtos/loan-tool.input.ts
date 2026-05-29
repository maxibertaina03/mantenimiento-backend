export class LoanToolInput {
  toolId!: string;
  responsibleId!: string;
  expectedAt?: Date | null;
  notes?: string | null;
  tenantId?: string | null;
}
