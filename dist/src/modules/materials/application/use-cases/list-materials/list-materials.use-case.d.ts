import { IMaterialRepository } from '../../../domain/repositories/material.repository';
import { ListMaterialsInput } from '../../dtos/list-materials.input';
import { ListMaterialsOutput } from '../../dtos/list-materials.output';
export declare class ListMaterialsUseCase {
    private readonly repository;
    constructor(repository: IMaterialRepository);
    execute(input: ListMaterialsInput): Promise<ListMaterialsOutput>;
}
