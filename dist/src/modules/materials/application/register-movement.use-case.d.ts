import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MaterialRepository, type StockMovementEntry } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { RegisterMovementInput } from './dto/material-input';
export interface MovementResult {
    material: Material;
    movement: StockMovementEntry;
}
export declare class RegisterMovementUseCase {
    private readonly materials;
    private readonly audit;
    constructor(materials: MaterialRepository, audit: AuditWriter);
    execute(materialId: string, input: RegisterMovementInput, actorId: string, tenantId: string | null): Promise<MovementResult>;
}
