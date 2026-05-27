import type { ToolLoanStatus, ToolStatus } from '@prisma/client';
import type { Tool } from '../domain/tool.entity';
import type { ToolLoanRecord } from '../domain/tool.repository';
export declare class ToolResponseDto {
    id: string;
    code: string;
    name: string;
    description: string | null;
    brand: string | null;
    model: string | null;
    serialNumber: string | null;
    status: ToolStatus;
    location: string | null;
    observations: string | null;
    acquiredAt: string | null;
    tenantId: string | null;
    createdAt: string;
    updatedAt: string;
    static from(t: Tool): ToolResponseDto;
}
export declare class PaginatedToolResponseDto {
    items: ToolResponseDto[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ToolLoanResponseDto {
    id: string;
    toolId: string;
    responsibleId: string;
    loanedAt: string;
    expectedAt: string | null;
    returnedAt: string | null;
    status: ToolLoanStatus;
    notes: string | null;
    tenantId: string | null;
    createdAt: string;
    static from(l: ToolLoanRecord): ToolLoanResponseDto;
}
export declare class ToolDetailResponseDto {
    tool: ToolResponseDto;
    activeLoan: ToolLoanResponseDto | null;
}
