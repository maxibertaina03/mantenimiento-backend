import { ToolStatus } from '../../domain/value-objects/tool-status.vo';
export declare class ToolListItemDto {
    id: string;
    code: string;
    name: string;
    brand?: string | null;
    model?: string | null;
    status: ToolStatus;
    location?: string | null;
    createdAt: Date;
}
export declare class ListToolsOutput {
    items: ToolListItemDto[];
    total: number;
    page: number;
    pageSize: number;
}
