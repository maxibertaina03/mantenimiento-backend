import { ToolStatus } from '@prisma/client';
declare const ADMIN_STATUSES: readonly ["AVAILABLE", "IN_REPAIR", "OUT_OF_SERVICE"];
type AdminStatus = (typeof ADMIN_STATUSES)[number];
export declare class CreateToolDto {
    code: string;
    name: string;
    description?: string | null;
    brand?: string | null;
    model?: string | null;
    serialNumber?: string | null;
    location?: string | null;
    observations?: string | null;
    acquiredAt?: string | null;
}
declare const UpdateToolDto_base: import("@nestjs/common").Type<Partial<CreateToolDto>>;
export declare class UpdateToolDto extends UpdateToolDto_base {
}
export declare class ChangeToolStatusDto {
    status: AdminStatus;
    reason?: string;
}
export declare class LoanToolDto {
    responsibleId: string;
    expectedAt?: string | null;
    notes?: string | null;
}
export declare class ListToolsQueryDto {
    page?: number;
    pageSize?: number;
    status?: ToolStatus;
    search?: string;
}
export {};
