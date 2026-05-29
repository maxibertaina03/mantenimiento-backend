import { Injectable } from '@nestjs/common';
import type { Prisma, ProviderServiceType as PrismaProviderServiceType } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Provider } from '../../domain/entities/provider.entity';
import { IProviderRepository, ProviderFilters } from '../../domain/repositories/provider.repository';
import { PrismaProviderMapper } from '../mappers/prisma-provider.mapper';

@Injectable()
export class PrismaProviderRepository implements IProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(provider: Provider): Promise<void> {
    const data = PrismaProviderMapper.toPersistence(provider);
    await this.prisma.provider.upsert({
      where: { id: provider.getId() },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<Provider | null> {
    const raw = await this.prisma.provider.findUnique({
      where: { id },
    });
    return raw ? PrismaProviderMapper.toDomain(raw) : null;
  }

  async findByName(name: string): Promise<Provider | null> {
    const raw = await this.prisma.provider.findFirst({
      where: { name },
    });
    return raw ? PrismaProviderMapper.toDomain(raw) : null;
  }

  async findAll(filters: ProviderFilters = {}): Promise<Provider[]> {
    const where: Prisma.ProviderWhereInput = { deletedAt: null };
    if (filters.tenantId) where.tenantId = filters.tenantId;
    if (filters.serviceType) where.serviceType = filters.serviceType as PrismaProviderServiceType;
    if (filters.active !== undefined) where.active = filters.active;
    if (filters.search) {
      const q = filters.search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { contactName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ];
    }
    const providers = await this.prisma.provider.findMany({
      where,
      orderBy: { name: 'asc' },
    });
    return providers.map((raw) => PrismaProviderMapper.toDomain(raw));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.provider.delete({
      where: { id },
    });
  }
}
