import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { UpdateMachineInput } from './dto/machine-input';
export declare class UpdateMachineUseCase {
    private readonly machines;
    private readonly audit;
    constructor(machines: MachineRepository, audit: AuditWriter);
    execute(id: string, input: UpdateMachineInput, actorId: string, tenantId: string | null): Promise<Machine>;
    private snapshot;
}
