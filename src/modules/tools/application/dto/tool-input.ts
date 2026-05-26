import type { ToolStatus } from '@prisma/client';

export interface RegisterToolInput {
  code: string;
  name: string;
  description?: string | null;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  location?: string | null;
  observations?: string | null;
  acquiredAt?: string | null;
}

export interface UpdateToolInput {
  name?: string;
  description?: string | null;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  location?: string | null;
  observations?: string | null;
  acquiredAt?: string | null;
}

export interface ChangeToolStatusInput {
  /** Valores válidos: AVAILABLE / IN_REPAIR / OUT_OF_SERVICE (no ON_LOAN). */
  status: Exclude<ToolStatus, 'ON_LOAN'>;
  reason?: string;
}

export interface LoanToolInput {
  responsibleId: string;
  expectedAt?: string | null;
  notes?: string | null;
}

export interface ReturnToolInput {
  notes?: string | null;
}

export interface ListToolsInput {
  page?: number;
  pageSize?: number;
  status?: ToolStatus;
  search?: string;
}
