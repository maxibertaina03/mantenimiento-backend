import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Material } from '../domain/material.entity';
import type { CreateMaterialProps, ListMaterialsQuery, MaterialRepository, MovementPersistInput, StockMovementEntry } from '../domain/material.repository';
export declare class PrismaMaterialRepository implements MaterialRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(props: CreateMaterialProps): Promise<Material>;
    findById(id: string): Promise<Material | null>;
    findByCode(code: string): Promise<Material | null>;
    list(query: ListMaterialsQuery): Promise<{
        items: Material[];
        total: number;
    }>;
    save(material: Material): Promise<Material>;
    softDelete(id: string): Promise<void>;
    persistMovement(material: Material, movement: MovementPersistInput): Promise<StockMovementEntry>;
    listMovements(materialId: string, skip?: number, take?: number): Promise<StockMovementEntry[]>;
    countLowStock(tenantId?: string | null): Promise<number>;
    private toDomain;
}
