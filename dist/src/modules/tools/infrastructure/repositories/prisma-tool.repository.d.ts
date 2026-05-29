import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Tool } from '../../domain/entities/tool.entity';
import { IToolRepository } from '../../domain/repositories/tool.repository';
export declare class PrismaToolRepository implements IToolRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(tool: Tool): Promise<void>;
    findById(id: string): Promise<Tool | null>;
    findByCode(code: string): Promise<Tool | null>;
    findAll(tenantId?: string | null): Promise<Tool[]>;
    delete(id: string): Promise<void>;
}
