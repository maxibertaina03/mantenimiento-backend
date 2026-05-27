import { CreateMaterialOutput } from '../../application/dtos/create-material.output';
import { MaterialResponseDto } from '../dtos/material.response.dto';
export class MaterialPresenterMapper {
  static toResponse(output: CreateMaterialOutput): MaterialResponseDto {
    return {
      id: output.id,
      code: output.code,
      name: output.name,
      description: output.description,
      unit: output.unit,
      stock: output.stock,
      minStock: output.minStock,
      location: output.location,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }
}
