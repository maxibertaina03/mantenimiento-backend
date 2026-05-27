import type { MaterialUnit, StockMovementType } from '@prisma/client';
import type { Material } from '../domain/material.entity';
import type { StockMovementEntry } from '../domain/material.repository';
export declare class MaterialResponseDto {
    id: string;
    code: string;
    name: string;
    description: string | null;
    unit: MaterialUnit;
    stock: string;
    minStock: string;
    isLowStock: boolean;
    location: string | null;
    tenantId: string | null;
    createdAt: string;
    updatedAt: string;
    static from(m: Material): MaterialResponseDto;
}
export declare class PaginatedMaterialResponseDto {
    items: MaterialResponseDto[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class StockMovementResponseDto {
    id: string;
    materialId: string;
    type: StockMovementType;
    quantity: string;
    stockAfter: string;
    reason: string | null;
    reference: string | null;
    createdById: string;
    createdAt: string;
    static from(m: StockMovementEntry): StockMovementResponseDto;
}
