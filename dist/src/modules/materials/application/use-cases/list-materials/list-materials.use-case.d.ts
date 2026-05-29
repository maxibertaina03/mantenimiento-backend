import { IMaterialRepository } from '../../../domain/repositories/material.repository';
import { ListMaterialsInput } from '../../dtos/list-materials.input';
import type { CreateMaterialOutput } from '../../dtos/create-material.output';
export interface ListMaterialsOutput {
    items: CreateMaterialOutput[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListMaterialsUseCase {
    private readonly repository;
    constructor(repository: IMaterialRepository);
    execute(input: ListMaterialsInput): Promise<ListMaterialsOutput>;
}
