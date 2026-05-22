import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError, ValidationError } from '@/common/exceptions/domain.exception';
import {
  MATERIAL_REPOSITORY,
  type MaterialRepository,
  type StockMovementEntry,
} from '../domain/material.repository';
import type { Material } from '../domain/material.entity';
import type { RegisterMovementInput } from './dto/material-input';

export interface MovementResult {
  material: Material;
  movement: StockMovementEntry;
}

@Injectable()
export class RegisterMovementUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY) private readonly materials: MaterialRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    materialId: string,
    input: RegisterMovementInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<MovementResult> {
    const material = await this.materials.findById(materialId);
    if (!material) throw new NotFoundError('Material', materialId);

    const applied =
      input.type === 'ADJUSTMENT'
        ? material.applyAdjustment(input.quantity, input.adjustmentSign ?? 1, input.reason ?? null)
        : material.applyMovement({
            type: input.type,
            quantity: input.quantity,
            reason: input.reason,
            reference: input.reference,
          });

    if (input.type === 'ADJUSTMENT' && input.adjustmentSign === undefined) {
      throw new ValidationError(
        'ADJUSTMENT_SIGN_REQUIRED',
        'Para ajustes hay que indicar el signo (1 = suma, -1 = resta)',
      );
    }

    const movement = await this.materials.persistMovement(material, {
      materialId,
      applied,
      reason: input.reason ?? null,
      reference: input.reference ?? null,
      createdById: actorId,
      tenantId,
    });

    await this.audit.write({
      actorId,
      action: 'STOCK_MOVEMENT',
      entityType: 'Material',
      entityId: materialId,
      payload: {
        type: applied.type,
        quantity: applied.quantity.toString(),
        delta: applied.delta.toString(),
        stockBefore: applied.stockBefore.toString(),
        stockAfter: applied.stockAfter.toString(),
        reason: input.reason,
        reference: input.reference,
      },
      tenantId,
    });

    return { material, movement };
  }
}
