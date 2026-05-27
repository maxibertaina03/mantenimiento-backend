import { type ToolLoanRecord, type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
export interface ToolDetail {
    tool: Tool;
    activeLoan: ToolLoanRecord | null;
}
export declare class GetToolUseCase {
    private readonly tools;
    constructor(tools: ToolRepository);
    execute(id: string): Promise<ToolDetail>;
}
