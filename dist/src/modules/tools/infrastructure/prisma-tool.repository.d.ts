import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Tool } from '../domain/tool.entity';
import type { CreateLoanProps, CreateToolProps, ListToolsQuery, ToolLoanRecord, ToolRepository } from '../domain/tool.repository';
export declare class PrismaToolRepository implements ToolRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(props: CreateToolProps): Promise<Tool>;
    findById(id: string): Promise<Tool | null>;
    findByCode(code: string): Promise<Tool | null>;
    list(query: ListToolsQuery): Promise<{
        items: Tool[];
        total: number;
    }>;
    save(tool: Tool): Promise<Tool>;
    softDelete(id: string): Promise<void>;
    createLoanWithToolUpdate(tool: Tool, props: CreateLoanProps): Promise<ToolLoanRecord>;
    closeActiveLoan(tool: Tool, returnedAt: Date): Promise<ToolLoanRecord>;
    findActiveLoan(toolId: string): Promise<ToolLoanRecord | null>;
    listLoans(toolId: string, skip?: number, take?: number): Promise<ToolLoanRecord[]>;
    countActiveLoans(tenantId?: string | null): Promise<number>;
    private toDomain;
}
