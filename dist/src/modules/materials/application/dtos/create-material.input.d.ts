import { MaterialUnit } from '../../domain/value-objects/material-unit.vo';
import { Decimal } from '@prisma/client/runtime/library';
export declare class CreateMaterialInput {
    code: string;
    name: string;
    description?: string | null;
    unit?: MaterialUnit;
    stock?: Decimal;
    minStock?: Decimal;
    location?: string | null;
}
