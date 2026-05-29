import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

export interface ListProviderHistoryInput {
  providerId: string;
  page?: number;
  pageSize?: number;
}

/**
 * Lista las órdenes de mantenimiento donde este proveedor fue el proveedor
 * asignado. Cross-bounded: lee directo de la tabla maintenance_orders.
 * (Alternativa más limpia: publicar evento, pero overkill para read model.)
 */
@Injectable()
export class ListProviderHistoryUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: ListProviderHistoryInput) {
    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 50;

    const orders = await this.prisma.maintenanceOrder.findMany({
      where: { providerId: input.providerId, deletedAt: null },
      orderBy: [{ scheduledFor: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return orders.map((o) => ({
      id: o.id,
      machineId: o.machineId,
      type: o.type,
      status: o.status,
      location: o.location,
      externalLocation: o.externalLocation,
      scheduledFor: o.scheduledFor,
      startedAt: o.startedAt,
      completedAt: o.completedAt,
      cost: o.cost,
      currency: o.currency,
      description: o.description,
      observations: o.observations,
      createdAt: o.createdAt,
    }));
  }
}
