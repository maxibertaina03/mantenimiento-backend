import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { RegisterMaterialInput } from './dto/material-input';
export declare class RegisterMaterialUseCase {
    private readonly materials;
    private readonly audit;
    constructor(materials: MaterialRepository, audit: AuditWriter);
    execute(input: RegisterMaterialInput, actorId: string, tenantId: string | null): Promise<Material>;
}
