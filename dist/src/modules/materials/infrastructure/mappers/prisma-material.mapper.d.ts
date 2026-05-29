import { Material as PrismaMaterial } from '@prisma/client';
import { Material } from '../../domain/entities/material.entity';
export declare class PrismaMaterialMapper {
    static toDomain(raw: PrismaMaterial): Material;
    static toPersistence(material: Material): Omit<PrismaMaterial, 'createdAt' | 'updatedAt' | 'deletedAt'>;
}
