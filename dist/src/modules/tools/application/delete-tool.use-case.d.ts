import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ToolRepository } from '../domain/tool.repository';
export declare class DeleteToolUseCase {
    private readonly tools;
    private readonly audit;
    constructor(tools: ToolRepository, audit: AuditWriter);
    execute(id: string, actorId: string, tenantId: string | null): Promise<void>;
}
