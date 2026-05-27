import { type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
export declare class GetMaterialUseCase {
    private readonly materials;
    constructor(materials: MaterialRepository);
    execute(id: string): Promise<Material>;
}
