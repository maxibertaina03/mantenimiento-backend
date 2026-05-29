import { MaterialUnit } from '../../domain/value-objects/material-unit.vo';
export declare class CreateMaterialRequestDto {
    code: string;
    name: string;
    description?: string | null;
    unit?: MaterialUnit;
    stock?: number;
    minStock?: number;
    location?: string | null;
}
