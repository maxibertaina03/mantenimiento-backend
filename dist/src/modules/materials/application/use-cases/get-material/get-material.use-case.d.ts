import { IMaterialRepository } from '../../../domain/repositories/material.repository';
import { CreateMaterialOutput } from '../../dtos/create-material.output';
export declare class GetMaterialUseCase {
    private readonly repository;
    constructor(repository: IMaterialRepository);
    execute(id: string): Promise<CreateMaterialOutput>;
}
