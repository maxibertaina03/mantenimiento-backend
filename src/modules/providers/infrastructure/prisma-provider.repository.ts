import { Injectable } from '@nestjs/common';
import { Prisma, type Provider as PrismaProvider } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Provider } from '../domain/provider.entity';
import type {
  CreateProviderProps,
  ListProvidersQuery,
  ProviderRepository,
} from '../domain/provider.repository';

@Injectable()
export class PrismaProviderRepository implements ProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(props: CreateProviderProps): Promise<Provider> {
    const row = await this.prisma.provider.create({
      data: {
        name: props.name,
        taxId: props.taxId ?? null,
        contactName: props.contactName ?? null,
        phone: props.phone ?? null,
        email: props.email ?? null,
        address: props.address ?? null,
        serviceType: props.serviceType,
        notes: props.notes ?? null,
        tenantId: props.tenantId ?? null,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Provider | null> {
    const row = await this.prisma.provider.findFirst({ where: { id, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async findByTaxId(taxId: string): Promise<Provider | null> {
    const row = await this.prisma.provider.findFirst({ where: { taxId, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async list(query: ListProvidersQuery): Promise<{ items: Provider[]; total: number }> {
    const where: Prisma.ProviderWhereInput = {
      deletedAt: null,
      ...(query.serviceType ? { serviceType: query.serviceType } : {}),
      ...(query.active !== undefined ? { active: query.active } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' } },
              { taxId: { contains: query.search, mode: 'insensitive' } },
              { contactName: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.provider.findMany({
        where,
        skip: query.skip ?? 0,
        take: query.take ?? 20,
        orderBy: [{ active: 'desc' }, { name: 'asc' }],
      }),
      this.prisma.provider.count({ where }),
    ]);
    return { items: rows.map((r) => this.toDomain(r)), total };
  }

  async save(provider: Provider): Promise<Provider> {
    const row = await this.prisma.provider.update({
      where: { id: provider.id },
      data: {
        name: provider.name,
        taxId: provider.taxId,
        contactName: provider.contactName,
        phone: provider.phone,
        email: provider.email,
        address: provider.address,
        serviceType: provider.serviceType,
        notes: provider.notes,
        active: provider.active,
      },
    });
    return this.toDomain(row);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.provider.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  private toDomain(row: PrismaProvider): Provider {
    return Provider.rehydrate({
      id: row.id,
      name: row.name,
      taxId: row.taxId,
      contactName: row.contactName,
      phone: row.phone,
      email: row.email,
      address: row.address,
      serviceType: row.serviceType,
      notes: row.notes,
      active: row.active,
      tenantId: row.tenantId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
