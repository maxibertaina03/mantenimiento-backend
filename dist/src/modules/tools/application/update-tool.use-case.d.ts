import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { UpdateToolInput } from './dto/tool-input';
export declare class UpdateToolUseCase {
    private readonly tools;
    private readonly audit;
    constructor(tools: ToolRepository, audit: AuditWriter);
    execute(id: string, input: UpdateToolInput, actorId: string, tenantId: string | null): Promise<Tool>;
}
