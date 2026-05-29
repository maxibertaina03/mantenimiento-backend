import { Injectable, Inject } from '@nestjs/common';
import { IMaterialRepository, MATERIAL_REPOSITORY } from '../../../domain/repositories/material.repository';
import { MaterialNotFoundException } from '../../../domain/exceptions/material-not-found.exception';

@Injectable()
export class DeleteMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY)
    private readonly repository: IMaterialRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const material = await this.repository.findById(id);
    if (!material) throw new MaterialNotFoundException(id);
    await this.repository.delete(id);
  }
}
