import { Prisma } from '@prisma/client';
import type { MaterialUnit, StockMovementType } from '@prisma/client';
declare const Decimal: typeof Prisma.Decimal;
type Decimal = Prisma.Decimal;
export interface MovementInput {
    type: StockMovementType;
    quantity: string;
    reason?: string | null;
    reference?: string | null;
}
export interface MovementApplied {
    type: StockMovementType;
    quantity: Decimal;
    delta: Decimal;
    stockBefore: Decimal;
    stockAfter: Decimal;
}
export declare class Material {
    readonly id: string;
    readonly code: string;
    private _name;
    private _description;
    private _unit;
    private _stock;
    private _minStock;
    private _location;
    readonly tenantId: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    private constructor();
    get name(): string;
    get description(): string | null;
    get unit(): MaterialUnit;
    get stock(): Decimal;
    get minStock(): Decimal;
    get location(): string | null;
    get isLowStock(): boolean;
    updateMetadata(input: {
        name?: string;
        description?: string | null;
        unit?: MaterialUnit;
        minStock?: string;
        location?: string | null;
    }): void;
    applyMovement(input: MovementInput): MovementApplied;
    applyAdjustment(quantity: string, sign: 1 | -1, reason?: string | null): MovementApplied;
    private deltaFor;
    static rehydrate(props: {
        id: string;
        code: string;
        name: string;
        description: string | null;
        unit: MaterialUnit;
        stock: Decimal | string;
        minStock: Decimal | string;
        location: string | null;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }): Material;
}
export {};
