import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { StockMovementOutput } from '../../dtos/stock-movement.output';
import type { StockMovementType } from '../../dtos/register-movement.input';

export interface ListMovementsInput {
  materialId: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class ListMovementsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: ListMovementsInput): Promise<StockMovementOutput[]> {
    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 50;

    const movements = await this.prisma.stockMovement.findMany({
      where: { materialId: input.materialId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return movements.map((m) => ({
      id: m.id,
      materialId: m.materialId,
      type: m.type as StockMovementType,
      quantity: m.quantity,
      stockAfter: m.stockAfter,
      reason: m.reason,
      reference: m.reference,
      createdById: m.createdById,
      createdAt: m.createdAt,
    }));
  }
}
