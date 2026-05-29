import { Injectable } from '@nestjs/common';
import type { Prisma, MachineStatus as PrismaMachineStatus } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Machine } from '../../domain/entities/machine.entity';
import { IMachineRepository, MachineFilters } from '../../domain/repositories/machine.repository';
import { PrismaMachineMapper } from '../mappers/prisma-machine.mapper';

@Injectable()
export class PrismaMachineRepository implements IMachineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(machine: Machine): Promise<void> {
    const data = PrismaMachineMapper.toPersistence(machine);
    await this.prisma.machine.upsert({
      where: { id: machine.getId() },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<Machine | null> {
    const raw = await this.prisma.machine.findUnique({
      where: { id },
    });
    return raw ? PrismaMachineMapper.toDomain(raw) : null;
  }

  async findByCode(code: string): Promise<Machine | null> {
    const raw = await this.prisma.machine.findUnique({
      where: { code },
    });
    return raw ? PrismaMachineMapper.toDomain(raw) : null;
  }

  async findAll(filters: MachineFilters = {}): Promise<Machine[]> {
    const where: Prisma.MachineWhereInput = { deletedAt: null };
    if (filters.tenantId) where.tenantId = filters.tenantId;
    if (filters.status) where.status = filters.status as PrismaMachineStatus;
    if (filters.responsibleId) where.responsibleId = filters.responsibleId;
    if (filters.search) {
      const q = filters.search.trim();
      where.OR = [
        { code: { contains: q, mode: 'insensitive' } },
        { name: { contains: q, mode: 'insensitive' } },
        { serialNumber: { contains: q, mode: 'insensitive' } },
      ];
    }
    const machines = await this.prisma.machine.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return machines.map((raw) => PrismaMachineMapper.toDomain(raw));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.machine.delete({
      where: { id },
    });
  }
}
