export type ToolLoanStatus = 'ACTIVE' | 'RETURNED' | 'LOST';

export class ToolLoanOutput {
  id!: string;
  toolId!: string;
  responsibleId!: string;
  loanedAt!: Date;
  expectedAt!: Date | null;
  returnedAt!: Date | null;
  status!: ToolLoanStatus;
  notes!: string | null;
  createdAt!: Date;
}
