import { MaterialUnit, StockMovementType } from '@prisma/client';
export declare class CreateMaterialDto {
    code: string;
    name: string;
    description?: string | null;
    unit: MaterialUnit;
    initialStock?: string;
    minStock?: string;
    location?: string | null;
}
declare const UpdateMaterialDto_base: import("@nestjs/common").Type<Partial<CreateMaterialDto>>;
export declare class UpdateMaterialDto extends UpdateMaterialDto_base {
}
export declare class RegisterMovementDto {
    type: StockMovementType;
    quantity: string;
    adjustmentSign?: 1 | -1;
    reason?: string | null;
    reference?: string | null;
}
export declare class ListMaterialsQueryDto {
    page?: number;
    pageSize?: number;
    search?: string;
    lowStockOnly?: boolean;
}
export {};
