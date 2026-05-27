import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { UpdateMaterialInput } from './dto/material-input';
export declare class UpdateMaterialUseCase {
    private readonly materials;
    private readonly audit;
    constructor(materials: MaterialRepository, audit: AuditWriter);
    execute(id: string, input: UpdateMaterialInput, actorId: string, tenantId: string | null): Promise<Material>;
}
