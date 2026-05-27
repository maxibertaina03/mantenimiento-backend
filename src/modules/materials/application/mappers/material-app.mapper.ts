import { Material } from '../../domain/entities/material.entity';
import { CreateMaterialOutput } from '../dtos/create-material.output';
export class MaterialAppMapper {
  static toOutput(material: Material): CreateMaterialOutput {
    return {
      id: material.getId(),
      code: material.getCode(),
      name: material.getName(),
      description: material.getDescription(),
      unit: material.getUnit(),
      stock: material.getStock(),
      minStock: material.getMinStock(),
      location: material.getLocation(),
      createdAt: material.getCreatedAt(),
    };
  }
}
