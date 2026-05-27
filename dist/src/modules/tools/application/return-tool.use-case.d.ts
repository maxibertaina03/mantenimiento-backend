import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ToolLoanRecord, type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
export interface ReturnResult {
    tool: Tool;
    loan: ToolLoanRecord;
}
export declare class ReturnToolUseCase {
    private readonly tools;
    private readonly audit;
    constructor(tools: ToolRepository, audit: AuditWriter);
    execute(toolId: string, actorId: string, tenantId: string | null): Promise<ReturnResult>;
}
