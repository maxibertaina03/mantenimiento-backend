import { Injectable, Inject } from '@nestjs/common';
import { IMaterialRepository, MATERIAL_REPOSITORY } from '../../../domain/repositories/material.repository';
import { MaterialAppMapper } from '../../mappers/material-app.mapper';
import { ListMaterialsInput } from '../../dtos/list-materials.input';
import type { CreateMaterialOutput } from '../../dtos/create-material.output';

export interface ListMaterialsOutput {
  items: CreateMaterialOutput[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListMaterialsUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY)
    private readonly repository: IMaterialRepository,
  ) {}

  async execute(input: ListMaterialsInput): Promise<ListMaterialsOutput> {
    const materials = await this.repository.findAll(input.tenantId);

    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedMaterials = materials.slice(start, end);

    const items = paginatedMaterials.map((m) => MaterialAppMapper.toOutput(m));

    return {
      items,
      total: materials.length,
      page,
      pageSize,
    };
  }
}
