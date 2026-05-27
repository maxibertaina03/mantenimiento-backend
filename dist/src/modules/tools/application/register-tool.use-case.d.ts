import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { RegisterToolInput } from './dto/tool-input';
export declare class RegisterToolUseCase {
    private readonly tools;
    private readonly audit;
    constructor(tools: ToolRepository, audit: AuditWriter);
    execute(input: RegisterToolInput, actorId: string, tenantId: string | null): Promise<Tool>;
}
