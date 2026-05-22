import { Injectable } from '@nestjs/common';
import { Prisma, type Material as PrismaMaterial } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { ConflictError } from '@/common/exceptions/domain.exception';
import { Material } from '../domain/material.entity';
import type {
  CreateMaterialProps,
  ListMaterialsQuery,
  MaterialRepository,
  MovementPersistInput,
  StockMovementEntry,
} from '../domain/material.repository';

@Injectable()
export class PrismaMaterialRepository implements MaterialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(props: CreateMaterialProps): Promise<Material> {
    const row = await this.prisma.material.create({
      data: {
        code: props.code,
        name: props.name,
        description: props.description ?? null,
        unit: props.unit,
        stock: props.initialStock ?? '0',
        minStock: props.minStock ?? '0',
        location: props.location ?? null,
        tenantId: props.tenantId ?? null,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Material | null> {
    const row = await this.prisma.material.findFirst({ where: { id, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async findByCode(code: string): Promise<Material | null> {
    const row = await this.prisma.material.findFirst({ where: { code, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async list(query: ListMaterialsQuery): Promise<{ items: Material[]; total: number }> {
    const where: Prisma.MaterialWhereInput = {
      deletedAt: null,
      ...(query.search
        ? {
            OR: [
              { code: { contains: query.search, mode: 'insensitive' } },
              { name: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    if (query.lowStockOnly) {
      // Postgres no permite comparar columnas dentro de findMany; usamos $queryRaw para esa rama.
      const rows = await this.prisma.$queryRaw<PrismaMaterial[]>`
        SELECT * FROM materials
        WHERE deleted_at IS NULL
          AND min_stock > 0
          AND stock < min_stock
        ORDER BY name ASC
        LIMIT ${query.take ?? 50}
      `;
      return { items: rows.map((r) => this.toDomain(r)), total: rows.length };
    }
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.material.findMany({
        where,
        skip: query.skip ?? 0,
        take: query.take ?? 20,
        orderBy: { name: 'asc' },
      }),
      this.prisma.material.count({ where }),
    ]);
    return { items: rows.map((r) => this.toDomain(r)), total };
  }

  async save(material: Material): Promise<Material> {
    const row = await this.prisma.material.update({
      where: { id: material.id },
      data: {
        name: material.name,
        description: material.description,
        unit: material.unit,
        minStock: material.minStock.toString(),
        location: material.location,
        // No tocamos `stock` acá: las mutaciones de stock pasan por persistMovement.
      },
    });
    return this.toDomain(row);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.material.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async persistMovement(
    material: Material,
    movement: MovementPersistInput,
  ): Promise<StockMovementEntry> {
    // Transacción + lock pesimista del row del material para evitar TOCTOU.
    return this.prisma.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<{ stock: Prisma.Decimal }[]>`
        SELECT stock FROM materials WHERE id = ${material.id}::uuid FOR UPDATE
      `;
      if (locked.length === 0) {
        throw new ConflictError('MATERIAL_VANISHED', 'El material no existe (lock)');
      }
      const currentStock = new Prisma.Decimal(locked[0].stock.toString());
      // Validamos que el stockBefore que tomó la entidad sigue siendo el real.
      if (!currentStock.equals(movement.applied.stockBefore)) {
        throw new ConflictError(
          'STOCK_CHANGED',
          'El stock del material cambió antes de aplicar el movimiento. Reintentar.',
          {
            expected: movement.applied.stockBefore.toString(),
            actual: currentStock.toString(),
          },
        );
      }
      const newStock = movement.applied.stockAfter;
      await tx.material.update({
        where: { id: material.id },
        data: { stock: newStock.toString() },
      });
      return tx.stockMovement.create({
        data: {
          materialId: material.id,
          type: movement.applied.type,
          quantity: movement.applied.quantity.toString(),
          stockAfter: newStock.toString(),
          reason: movement.reason ?? null,
          reference: movement.reference ?? null,
          createdById: movement.createdById,
          tenantId: movement.tenantId ?? null,
        },
      });
    });
  }

  async listMovements(
    materialId: string,
    skip = 0,
    take = 20,
  ): Promise<StockMovementEntry[]> {
    return this.prisma.stockMovement.findMany({
      where: { materialId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  async countLowStock(tenantId?: string | null): Promise<number> {
    const rows = await this.prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint AS count FROM materials
      WHERE deleted_at IS NULL
        AND min_stock > 0
        AND stock < min_stock
        ${tenantId !== undefined && tenantId !== null
          ? Prisma.sql`AND tenant_id = ${tenantId}::uuid`
          : Prisma.empty}
    `;
    return Number(rows[0]?.count ?? 0);
  }

  private toDomain(row: PrismaMaterial): Material {
    return Material.rehydrate({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      unit: row.unit,
      stock: row.stock,
      minStock: row.minStock,
      location: row.location,
      tenantId: row.tenantId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
