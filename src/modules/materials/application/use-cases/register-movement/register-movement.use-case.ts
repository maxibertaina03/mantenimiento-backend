import { Inject, Injectable } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { IMaterialRepository, MATERIAL_REPOSITORY } from '../../../domain/repositories/material.repository';
import { MaterialNotFoundException } from '../../../domain/exceptions/material-not-found.exception';
import { InvalidMaterialException } from '../../../domain/exceptions/invalid-material.exception';
import { PrismaMaterialMapper } from '../../../infrastructure/mappers/prisma-material.mapper';
import { MaterialAppMapper } from '../../mappers/material-app.mapper';
import { RegisterMovementInput } from '../../dtos/register-movement.input';
import { StockMovementOutput } from '../../dtos/stock-movement.output';
import type { CreateMaterialOutput } from '../../dtos/create-material.output';

export interface RegisterMovementOutput {
  material: CreateMaterialOutput;
  movement: StockMovementOutput;
}

/**
 * Registra un movimiento de stock y actualiza el stock del material.
 * Atómico: ambas operaciones en una transacción.
 *
 * Reglas de aplicación según tipo:
 *  - INBOUND     → stock += quantity
 *  - OUTBOUND    → stock -= quantity (falla si insuficiente)
 *  - CONSUMPTION → stock -= quantity (falla si insuficiente)
 *  - ADJUSTMENT  → stock += quantity * adjustmentSign (1 ó -1)
 */
@Injectable()
export class RegisterMovementUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY)
    private readonly repository: IMaterialRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: RegisterMovementInput): Promise<RegisterMovementOutput> {
    const material = await this.repository.findById(input.materialId);
    if (!material) throw new MaterialNotFoundException(input.materialId);

    if (input.quantity.lessThanOrEqualTo(0)) {
      throw new InvalidMaterialException('La cantidad debe ser mayor a cero');
    }

    if (input.type === 'ADJUSTMENT' && input.adjustmentSign !== 1 && input.adjustmentSign !== -1) {
      throw new InvalidMaterialException('ADJUSTMENT requiere adjustmentSign = 1 ó -1');
    }

    // Aplicar movimiento al stock
    if (input.type === 'INBOUND') {
      material.addStock(input.quantity);
    } else if (input.type === 'OUTBOUND' || input.type === 'CONSUMPTION') {
      material.removeStock(input.quantity);
    } else if (input.type === 'ADJUSTMENT') {
      if (input.adjustmentSign === 1) material.addStock(input.quantity);
      else material.removeStock(input.quantity);
    }

    const stockAfter = material.getStock();
    const movementId = generateUUID();
    const now = new Date();

    // Persistir material + movement en transacción
    const materialData = PrismaMaterialMapper.toPersistence(material);
    await this.prisma.$transaction([
      this.prisma.material.update({
        where: { id: material.getId() },
        data: materialData,
      }),
      this.prisma.stockMovement.create({
        data: {
          id: movementId,
          materialId: material.getId(),
          type: input.type,
          quantity: input.quantity,
          stockAfter,
          reason: input.reason ?? null,
          reference: input.reference ?? null,
          createdById: input.createdById,
          tenantId: input.tenantId ?? null,
        },
      }),
    ]);

    return {
      material: MaterialAppMapper.toOutput(material),
      movement: {
        id: movementId,
        materialId: material.getId(),
        type: input.type,
        quantity: input.quantity,
        stockAfter,
        reason: input.reason ?? null,
        reference: input.reference ?? null,
        createdById: input.createdById,
        createdAt: now,
      },
    };
  }
}
