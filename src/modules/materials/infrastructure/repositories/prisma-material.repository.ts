import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Material } from '../../domain/entities/material.entity';
import { IMaterialRepository, MaterialFilters } from '../../domain/repositories/material.repository';
import { PrismaMaterialMapper } from '../mappers/prisma-material.mapper';

@Injectable()
export class PrismaMaterialRepository implements IMaterialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(material: Material): Promise<void> {
    const data = PrismaMaterialMapper.toPersistence(material);
    await this.prisma.material.upsert({
      where: { id: material.getId() },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<Material | null> {
    const raw = await this.prisma.material.findUnique({ where: { id } });
    return raw ? PrismaMaterialMapper.toDomain(raw) : null;
  }

  async findByCode(code: string): Promise<Material | null> {
    const raw = await this.prisma.material.findUnique({ where: { code } });
    return raw ? PrismaMaterialMapper.toDomain(raw) : null;
  }

  async findAll(filters: MaterialFilters = {}): Promise<Material[]> {
    const where: Prisma.MaterialWhereInput = { deletedAt: null };
    if (filters.tenantId) where.tenantId = filters.tenantId;
    if (filters.search) {
      const q = filters.search.trim();
      where.OR = [
        { code: { contains: q, mode: 'insensitive' } },
        { name: { contains: q, mode: 'insensitive' } },
      ];
    }
    let materials = await this.prisma.material.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    if (filters.lowStockOnly) {
      materials = materials.filter(
        (m) => m.minStock.gt(0) && m.stock.lt(m.minStock),
      );
    }
    return materials.map((raw) => PrismaMaterialMapper.toDomain(raw));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.material.delete({ where: { id } });
  }
}
