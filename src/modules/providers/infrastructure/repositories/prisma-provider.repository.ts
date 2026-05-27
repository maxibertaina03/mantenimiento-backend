import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Provider } from '../../domain/entities/provider.entity';
import { IProviderRepository } from '../../domain/repositories/provider.repository';
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

  async findAll(tenantId?: string | null): Promise<Provider[]> {
    const providers = await this.prisma.provider.findMany({
      where: tenantId ? { tenantId } : {},
    });
    return providers.map((raw) => PrismaProviderMapper.toDomain(raw));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.provider.delete({
      where: { id },
    });
  }
}
