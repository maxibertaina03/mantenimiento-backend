import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MachineRepository } from '../domain/machine.repository';
export declare class DeleteMachineUseCase {
    private readonly machines;
    private readonly audit;
    constructor(machines: MachineRepository, audit: AuditWriter);
    execute(id: string, actorId: string, tenantId: string | null): Promise<void>;
}
