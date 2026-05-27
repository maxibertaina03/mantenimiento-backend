import type { MaterialUnit, StockMovementType } from '@prisma/client';
export interface RegisterMaterialInput {
    code: string;
    name: string;
    description?: string | null;
    unit: MaterialUnit;
    initialStock?: string;
    minStock?: string;
    location?: string | null;
}
export interface UpdateMaterialInput {
    name?: string;
    description?: string | null;
    unit?: MaterialUnit;
    minStock?: string;
    location?: string | null;
}
export interface RegisterMovementInput {
    type: StockMovementType;
    quantity: string;
    adjustmentSign?: 1 | -1;
    reason?: string | null;
    reference?: string | null;
}
export interface ListMaterialsInput {
    page?: number;
    pageSize?: number;
    search?: string;
    lowStockOnly?: boolean;
}
