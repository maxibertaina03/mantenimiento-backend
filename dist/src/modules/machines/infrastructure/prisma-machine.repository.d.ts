import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Machine } from '../domain/machine.entity';
import type { CreateMachineProps, ListMachinesQuery, MachineRepository, MachineUsageLogProps, UsageLogEntry } from '../domain/machine.repository';
export declare class PrismaMachineRepository implements MachineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(props: CreateMachineProps): Promise<Machine>;
    findById(id: string): Promise<Machine | null>;
    findByCode(code: string): Promise<Machine | null>;
    list(query: ListMachinesQuery): Promise<{
        items: Machine[];
        total: number;
    }>;
    save(machine: Machine): Promise<Machine>;
    softDelete(id: string): Promise<void>;
    logUsageAndSave(machine: Machine, log: Omit<MachineUsageLogProps, 'machineId' | 'tenantId'>): Promise<UsageLogEntry>;
    listUsageLogs(machineId: string, skip?: number, take?: number): Promise<UsageLogEntry[]>;
    findPreventiveDue(tenantId?: string | null): Promise<Machine[]>;
    private toDomain;
}
