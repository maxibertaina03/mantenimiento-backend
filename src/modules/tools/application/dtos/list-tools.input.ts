import type { ToolStatus } from '../../domain/value-objects/tool-status.vo';

export class ListToolsInput {
  tenantId?: string | null;
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ToolStatus;
}
