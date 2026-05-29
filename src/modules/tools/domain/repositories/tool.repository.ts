import { Tool } from '../entities/tool.entity';
import { ToolStatus } from '../value-objects/tool-status.vo';

export interface ToolFilters {
  tenantId?: string | null;
  search?: string;
  status?: ToolStatus;
}

export interface IToolRepository {
  save(tool: Tool): Promise<void>;
  findById(id: string): Promise<Tool | null>;
  findByCode(code: string): Promise<Tool | null>;
  findAll(filters?: ToolFilters): Promise<Tool[]>;
  delete(id: string): Promise<void>;
}
export const TOOL_REPOSITORY = 'IToolRepository';
