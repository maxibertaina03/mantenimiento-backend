import { Injectable, Inject } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { Decimal } from '@prisma/client/runtime/library';
import { Material } from '../../../domain/entities/material.entity';
import { IMaterialRepository, MATERIAL_REPOSITORY } from '../../../domain/repositories/material.repository';
import { MaterialUnit } from '../../../domain/value-objects/material-unit.vo';
import { InvalidMaterialException } from '../../../domain/exceptions/invalid-material.exception';
import { CreateMaterialInput } from '../../dtos/create-material.input';
import { CreateMaterialOutput } from '../../dtos/create-material.output';
import { MaterialAppMapper } from '../../mappers/material-app.mapper';

@Injectable()
export class CreateMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY)
    private readonly repository: IMaterialRepository,
  ) {}

  async execute(input: CreateMaterialInput): Promise<CreateMaterialOutput> {
    const material = new Material(
      generateUUID(),
      input.code,
      input.name,
      input.description ?? null,
      input.unit ?? MaterialUnit.UNIT,
      input.stock ?? new Decimal(0),
      input.minStock ?? new Decimal(0),
      input.location ?? null,
      null,
    );

    const existing = await this.repository.findByCode(material.getCode());
    if (existing) {
      throw new InvalidMaterialException(`Material with code "${material.getCode()}" already exists`);
    }

    await this.repository.save(material);
    return MaterialAppMapper.toOutput(material);
  }
}
