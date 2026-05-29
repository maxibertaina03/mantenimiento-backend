import { IMaterialRepository } from '../../../domain/repositories/material.repository';
export declare class DeleteMaterialUseCase {
    private readonly repository;
    constructor(repository: IMaterialRepository);
    execute(id: string): Promise<void>;
}
