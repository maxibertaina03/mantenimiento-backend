import { Material as PrismaMaterial, MaterialUnit as PrismaMaterialUnit } from '@prisma/client';
import { Material } from '../../domain/entities/material.entity';
import { MaterialUnit } from '../../domain/value-objects/material-unit.vo';

export class PrismaMaterialMapper {
  static toDomain(raw: PrismaMaterial): Material {
    return new Material(
      raw.id,
      raw.code,
      raw.name,
      raw.description,
      raw.unit as MaterialUnit,
      raw.stock,
      raw.minStock,
      raw.location,
      raw.tenantId,
      raw.createdAt,
      raw.updatedAt,
      raw.deletedAt,
    );
  }

  static toPersistence(material: Material): Omit<PrismaMaterial, 'createdAt' | 'updatedAt' | 'deletedAt'> {
    return {
      id: material.getId(),
      code: material.getCode(),
      name: material.getName(),
      description: material.getDescription(),
      unit: material.getUnit() as PrismaMaterialUnit,
      stock: material.getStock(),
      minStock: material.getMinStock(),
      location: material.getLocation(),
      tenantId: material.getTenantId(),
    };
  }
}
