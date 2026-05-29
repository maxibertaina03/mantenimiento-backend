import { Injectable, Inject } from '@nestjs/common';
import { IMaterialRepository, MATERIAL_REPOSITORY } from '../../../domain/repositories/material.repository';
import { ListMaterialsInput } from '../../dtos/list-materials.input';
import { ListMaterialsOutput, MaterialListItemDto } from '../../dtos/list-materials.output';

@Injectable()
export class ListMaterialsUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY)
    private readonly repository: IMaterialRepository,
  ) {}

  async execute(input: ListMaterialsInput): Promise<ListMaterialsOutput> {
    const materials = await this.repository.findAll(input.tenantId);

    const start = ((input.page ?? 1) - 1) * (input.pageSize ?? 10);
    const end = start + (input.pageSize ?? 10);
    const paginatedMaterials = materials.slice(start, end);

    const items: MaterialListItemDto[] = paginatedMaterials.map((m) => ({
      id: m.getId(),
      code: m.getCode(),
      name: m.getName(),
      unit: m.getUnit(),
      stock: m.getStock(),
      minStock: m.getMinStock(),
      location: m.getLocation(),
      createdAt: m.getCreatedAt(),
    }));

    return {
      items,
      total: materials.length,
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 10,
    };
  }
}
