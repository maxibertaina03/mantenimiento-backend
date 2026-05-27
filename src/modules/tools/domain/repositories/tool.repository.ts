import { Tool } from '../entities/tool.entity';
export interface IToolRepository {
  save(tool: Tool): Promise<void>;
  findById(id: string): Promise<Tool | null>;
  findByCode(code: string): Promise<Tool | null>;
  findAll(tenantId?: string | null): Promise<Tool[]>;
  delete(id: string): Promise<void>;
}
export const TOOL_REPOSITORY = 'IToolRepository';
