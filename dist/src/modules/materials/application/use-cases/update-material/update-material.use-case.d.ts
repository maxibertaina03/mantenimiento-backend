import { IMaterialRepository } from '../../../domain/repositories/material.repository';
import { CreateMaterialOutput } from '../../dtos/create-material.output';
export declare class UpdateMaterialInput {
    id: string;
    name?: string;
    location?: string | null;
}
export declare class UpdateMaterialUseCase {
    private readonly repository;
    constructor(repository: IMaterialRepository);
    execute(input: UpdateMaterialInput): Promise<CreateMaterialOutput>;
}
