import { Inject, Injectable } from '@nestjs/common';
import { MATERIAL_REPOSITORY, type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { ListMaterialsInput } from './dto/material-input';

export interface PaginatedMaterials {
  items: Material[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListMaterialsUseCase {
  constructor(@Inject(MATERIAL_REPOSITORY) private readonly materials: MaterialRepository) {}

  async execute(input: ListMaterialsInput): Promise<PaginatedMaterials> {
    const page = Math.max(1, input.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, input.pageSize ?? 20));
    const { items, total } = await this.materials.list({
      skip: (page - 1) * pageSize,
      take: pageSize,
      search: input.search?.trim() || undefined,
      lowStockOnly: input.lowStockOnly,
    });
    return { items, total, page, pageSize };
  }
}
