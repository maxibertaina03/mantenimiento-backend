import { type MaterialRepository, type StockMovementEntry } from '../domain/material.repository';
export declare class ListMovementsUseCase {
    private readonly materials;
    constructor(materials: MaterialRepository);
    execute(materialId: string, page?: number, pageSize?: number): Promise<StockMovementEntry[]>;
}
