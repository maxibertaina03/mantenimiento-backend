import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MATERIAL_REPOSITORY, type MaterialRepository } from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { UpdateMaterialInput } from './dto/material-input';

@Injectable()
export class UpdateMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY) private readonly materials: MaterialRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: UpdateMaterialInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Material> {
    const material = await this.materials.findById(id);
    if (!material) throw new NotFoundError('Material', id);
    material.updateMetadata(input);
    const saved = await this.materials.save(material);
    await this.audit.write({
      actorId,
      action: 'UPDATE',
      entityType: 'Material',
      entityId: saved.id,
      payload: input as Record<string, unknown>,
      tenantId,
    });
    return saved;
  }
}
