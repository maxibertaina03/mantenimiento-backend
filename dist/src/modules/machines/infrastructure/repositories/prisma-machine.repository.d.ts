import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Machine } from '../../domain/entities/machine.entity';
import { IMachineRepository } from '../../domain/repositories/machine.repository';
export declare class PrismaMachineRepository implements IMachineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(machine: Machine): Promise<void>;
    findById(id: string): Promise<Machine | null>;
    findByCode(code: string): Promise<Machine | null>;
    findAll(tenantId?: string | null): Promise<Machine[]>;
    delete(id: string): Promise<void>;
}
