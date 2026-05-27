import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ToolLoanRecord, type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { LoanToolInput } from './dto/tool-input';
export interface LoanResult {
    tool: Tool;
    loan: ToolLoanRecord;
}
export declare class LoanToolUseCase {
    private readonly tools;
    private readonly audit;
    constructor(tools: ToolRepository, audit: AuditWriter);
    execute(toolId: string, input: LoanToolInput, actorId: string, tenantId: string | null): Promise<LoanResult>;
}
