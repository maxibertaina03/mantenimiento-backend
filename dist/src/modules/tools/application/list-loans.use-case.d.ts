import { type ToolLoanRecord, type ToolRepository } from '../domain/tool.repository';
export declare class ListLoansUseCase {
    private readonly tools;
    constructor(tools: ToolRepository);
    execute(toolId: string, page?: number, pageSize?: number): Promise<ToolLoanRecord[]>;
}
