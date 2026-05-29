import { Injectable, Inject } from '@nestjs/common';
import { IMaterialRepository, MATERIAL_REPOSITORY } from '../../../domain/repositories/material.repository';
import { MaterialNotFoundException } from '../../../domain/exceptions/material-not-found.exception';
import { CreateMaterialOutput } from '../../dtos/create-material.output';
import { MaterialAppMapper } from '../../mappers/material-app.mapper';

export class UpdateMaterialInput {
  id!: string;
  name?: string;
  location?: string | null;
}

@Injectable()
export class UpdateMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY)
    private readonly repository: IMaterialRepository,
  ) {}

  async execute(input: UpdateMaterialInput): Promise<CreateMaterialOutput> {
    const material = await this.repository.findById(input.id);
    if (!material) throw new MaterialNotFoundException(input.id);

    if (input.name) material.changeName(input.name);
    if (input.location !== undefined) material.updateLocation(input.location);

    await this.repository.save(material);
    return MaterialAppMapper.toOutput(material);
  }
}
