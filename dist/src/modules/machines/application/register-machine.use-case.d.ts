import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';
import type { RegisterMachineInput } from './dto/machine-input';
export declare class RegisterMachineUseCase {
    private readonly machines;
    private readonly audit;
    constructor(machines: MachineRepository, audit: AuditWriter);
    execute(input: RegisterMachineInput, actorId: string, tenantId: string | null): Promise<Machine>;
}
