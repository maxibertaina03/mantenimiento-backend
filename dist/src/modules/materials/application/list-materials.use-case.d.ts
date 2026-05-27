import { type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { ListMaterialsInput } from './dto/material-input';
export interface PaginatedMaterials {
    items: Material[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListMaterialsUseCase {
    private readonly materials;
    constructor(materials: MaterialRepository);
    execute(input: ListMaterialsInput): Promise<PaginatedMaterials>;
}
