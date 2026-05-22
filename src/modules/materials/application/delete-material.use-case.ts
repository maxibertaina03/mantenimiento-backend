import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MATERIAL_REPOSITORY, type MaterialRepository } from '../domain/material.repository';

@Injectable()
export class DeleteMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY) private readonly materials: MaterialRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(id: string, actorId: string, tenantId: string | null): Promise<void> {
    const material = await this.materials.findById(id);
    if (!material) throw new NotFoundError('Material', id);
    await this.materials.softDelete(id);
    await this.audit.write({
      actorId,
      action: 'DELETE',
      entityType: 'Material',
      entityId: id,
      payload: { code: material.code, name: material.name },
      tenantId,
    });
  }
}
