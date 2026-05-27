import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { ChangeToolStatusInput } from './dto/tool-input';
export declare class ChangeToolStatusUseCase {
    private readonly tools;
    private readonly audit;
    constructor(tools: ToolRepository, audit: AuditWriter);
    execute(id: string, input: ChangeToolStatusInput, actorId: string, tenantId: string | null): Promise<Tool>;
}
