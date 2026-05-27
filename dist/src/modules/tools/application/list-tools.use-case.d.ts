import { type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { ListToolsInput } from './dto/tool-input';
export interface PaginatedTools {
    items: Tool[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListToolsUseCase {
    private readonly tools;
    constructor(tools: ToolRepository);
    execute(input: ListToolsInput): Promise<PaginatedTools>;
}
