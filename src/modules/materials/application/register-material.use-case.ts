import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { ConflictError } from '@/common/exceptions/domain.exception';
import { MATERIAL_REPOSITORY, type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { RegisterMaterialInput } from './dto/material-input';

@Injectable()
export class RegisterMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY) private readonly materials: MaterialRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    input: RegisterMaterialInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Material> {
    const existing = await this.materials.findByCode(input.code);
    if (existing) {
      throw new ConflictError('MATERIAL_CODE_TAKEN', `El código ${input.code} ya está en uso`);
    }
    const material = await this.materials.create({ ...input, tenantId });
    await this.audit.write({
      actorId,
      action: 'CREATE',
      entityType: 'Material',
      entityId: material.id,
      payload: { code: material.code, name: material.name },
      tenantId,
    });
    return material;
  }
}
