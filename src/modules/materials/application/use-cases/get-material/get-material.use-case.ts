import { Injectable, Inject } from '@nestjs/common';
import { IMaterialRepository, MATERIAL_REPOSITORY } from '../../../domain/repositories/material.repository';
import { MaterialNotFoundException } from '../../../domain/exceptions/material-not-found.exception';
import { CreateMaterialOutput } from '../../dtos/create-material.output';
import { MaterialAppMapper } from '../../mappers/material-app.mapper';

@Injectable()
export class GetMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY)
    private readonly repository: IMaterialRepository,
  ) {}

  async execute(id: string): Promise<CreateMaterialOutput> {
    const material = await this.repository.findById(id);
    if (!material) throw new MaterialNotFoundException(id);
    return MaterialAppMapper.toOutput(material);
  }
}
