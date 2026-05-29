import { IMaterialRepository } from '../../../domain/repositories/material.repository';
import { CreateMaterialInput } from '../../dtos/create-material.input';
import { CreateMaterialOutput } from '../../dtos/create-material.output';
export declare class CreateMaterialUseCase {
    private readonly repository;
    constructor(repository: IMaterialRepository);
    execute(input: CreateMaterialInput): Promise<CreateMaterialOutput>;
}
