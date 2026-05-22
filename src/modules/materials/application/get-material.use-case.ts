import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MATERIAL_REPOSITORY, type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';

@Injectable()
export class GetMaterialUseCase {
  constructor(@Inject(MATERIAL_REPOSITORY) private readonly materials: MaterialRepository) {}

  async execute(id: string): Promise<Material> {
    const material = await this.materials.findById(id);
    if (!material) throw new NotFoundError('Material', id);
    return material;
  }
}
