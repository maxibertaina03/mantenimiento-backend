import type { ToolLoanStatus, ToolStatus } from '@prisma/client';
import type { Tool } from './tool.entity';

export interface CreateToolProps {
  code: string;
  name: string;
  description?: string | null;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  status?: ToolStatus;
  location?: string | null;
  observations?: string | null;
  acquiredAt?: Date | null;
  tenantId?: string | null;
}

export interface ListToolsQuery {
  skip?: number;
  take?: number;
  status?: ToolStatus;
  search?: string;
}

export interface ToolLoanRecord {
  id: string;
  toolId: string;
  responsibleId: string;
  loanedAt: Date;
  expectedAt: Date | null;
  returnedAt: Date | null;
  status: ToolLoanStatus;
  notes: string | null;
  tenantId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLoanProps {
  toolId: string;
  responsibleId: string;
  expectedAt?: Date | null;
  notes?: string | null;
  tenantId?: string | null;
}

export interface ToolRepository {
  create(props: CreateToolProps): Promise<Tool>;
  findById(id: string): Promise<Tool | null>;
  findByCode(code: string): Promise<Tool | null>;
  list(query: ListToolsQuery): Promise<{ items: Tool[]; total: number }>;
  save(tool: Tool): Promise<Tool>;
  softDelete(id: string): Promise<void>;

  /** Persiste el cambio de estado de la herramienta + crea el préstamo activo. */
  createLoanWithToolUpdate(tool: Tool, props: CreateLoanProps): Promise<ToolLoanRecord>;

  /** Cierra el préstamo activo + cambia el estado a AVAILABLE atomicamente. */
  closeActiveLoan(tool: Tool, returnedAt: Date): Promise<ToolLoanRecord>;

  /** El préstamo abierto de la herramienta, si existe. */
  findActiveLoan(toolId: string): Promise<ToolLoanRecord | null>;

  /** Listado histórico de préstamos de una herramienta. */
  listLoans(toolId: string, skip?: number, take?: number): Promise<ToolLoanRecord[]>;

  /** Cantidad de préstamos activos (para dashboard). */
  countActiveLoans(tenantId?: string | null): Promise<number>;
}

export const TOOL_REPOSITORY = Symbol('ToolRepository');
