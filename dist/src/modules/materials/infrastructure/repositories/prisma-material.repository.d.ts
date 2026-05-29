import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Material } from '../../domain/entities/material.entity';
import { IMaterialRepository } from '../../domain/repositories/material.repository';
export declare class PrismaMaterialRepository implements IMaterialRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(material: Material): Promise<void>;
    findById(id: string): Promise<Material | null>;
    findByCode(code: string): Promise<Material | null>;
    findAll(tenantId?: string | null): Promise<Material[]>;
    delete(id: string): Promise<void>;
}
