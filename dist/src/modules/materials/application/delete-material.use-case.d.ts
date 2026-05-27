import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MaterialRepository } from '../domain/material.repository';
export declare class DeleteMaterialUseCase {
    private readonly materials;
    private readonly audit;
    constructor(materials: MaterialRepository, audit: AuditWriter);
    execute(id: string, actorId: string, tenantId: string | null): Promise<void>;
}
