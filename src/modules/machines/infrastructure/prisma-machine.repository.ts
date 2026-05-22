import { Injectable } from '@nestjs/common';
import { Prisma, type Machine as PrismaMachine } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Machine } from '../domain/machine.entity';
import type {
  CreateMachineProps,
  ListMachinesQuery,
  MachineRepository,
  MachineUsageLogProps,
  UsageLogEntry,
} from '../domain/machine.repository';

@Injectable()
export class PrismaMachineRepository implements MachineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(props: CreateMachineProps): Promise<Machine> {
    const row = await this.prisma.machine.create({
      data: {
        code: props.code,
        name: props.name,
        brand: props.brand ?? null,
        model: props.model ?? null,
        serialNumber: props.serialNumber ?? null,
        status: props.status ?? 'OPERATIONAL',
        usageHours: props.usageHours ?? '0',
        location: props.location ?? null,
        responsibleId: props.responsibleId ?? null,
        notes: props.notes ?? null,
        preventiveIntervalHours: props.preventiveIntervalHours ?? null,
        tenantId: props.tenantId ?? null,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Machine | null> {
    const row = await this.prisma.machine.findFirst({ where: { id, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async findByCode(code: string): Promise<Machine | null> {
    const row = await this.prisma.machine.findFirst({ where: { code, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async list(query: ListMachinesQuery): Promise<{ items: Machine[]; total: number }> {
    const where: Prisma.MachineWhereInput = {
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
      ...(query.responsibleId ? { responsibleId: query.responsibleId } : {}),
      ...(query.search
        ? {
            OR: [
              { code: { contains: query.search, mode: 'insensitive' } },
              { name: { contains: query.search, mode: 'insensitive' } },
              { serialNumber: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.machine.findMany({
        where,
        skip: query.skip ?? 0,
        take: query.take ?? 20,
        orderBy: [{ status: 'asc' }, { name: 'asc' }],
      }),
      this.prisma.machine.count({ where }),
    ]);
    return { items: rows.map((r) => this.toDomain(r)), total };
  }

  async save(machine: Machine): Promise<Machine> {
    const row = await this.prisma.machine.update({
      where: { id: machine.id },
      data: {
        name: machine.name,
        brand: machine.brand,
        model: machine.model,
        serialNumber: machine.serialNumber,
        status: machine.status,
        usageHours: machine.usageHours.toString(),
        location: machine.location,
        responsibleId: machine.responsibleId,
        notes: machine.notes,
        preventiveIntervalHours: machine.preventive.intervalHours?.toString() ?? null,
        lastPreventiveAtHours: machine.preventive.lastDoneAtHours?.toString() ?? null,
      },
    });
    return this.toDomain(row);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.machine.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async logUsageAndSave(
    machine: Machine,
    log: Omit<MachineUsageLogProps, 'machineId' | 'tenantId'>,
  ): Promise<UsageLogEntry> {
    const [, created] = await this.prisma.$transaction([
      this.prisma.machine.update({
        where: { id: machine.id },
        data: { usageHours: machine.usageHours.toString() },
      }),
      this.prisma.machineUsageLog.create({
        data: {
          machineId: machine.id,
          hoursBefore: log.hoursBefore.toString(),
          hoursAfter: log.hoursAfter.toString(),
          delta: log.delta.toString(),
          notes: log.notes ?? null,
          createdById: log.createdById,
          tenantId: machine.tenantId,
        },
      }),
    ]);
    return created;
  }

  async listUsageLogs(machineId: string, skip = 0, take = 20): Promise<UsageLogEntry[]> {
    return this.prisma.machineUsageLog.findMany({
      where: { machineId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  async findPreventiveDue(tenantId?: string | null): Promise<Machine[]> {
    // No es posible expresar `usageHours - lastPreventive >= interval` con findMany.
    // Usamos $queryRaw para mantener la query eficiente; el cálculo "due" final
    // lo confirma `Machine.isPreventiveDue()` para no duplicar lógica de dominio.
    const rows = await this.prisma.$queryRaw<PrismaMachine[]>`
      SELECT * FROM machines
      WHERE deleted_at IS NULL
        AND preventive_interval_hours IS NOT NULL
        AND (usage_hours - COALESCE(last_preventive_at_hours, 0)) >= preventive_interval_hours
        ${tenantId !== undefined && tenantId !== null
          ? Prisma.sql`AND tenant_id = ${tenantId}::uuid`
          : Prisma.empty}
      ORDER BY (usage_hours - COALESCE(last_preventive_at_hours, 0) - preventive_interval_hours) DESC
    `;
    return rows.map((r) => this.toDomain(r));
  }

  private toDomain(row: PrismaMachine): Machine {
    return Machine.rehydrate({
      id: row.id,
      code: row.code,
      name: row.name,
      brand: row.brand,
      model: row.model,
      serialNumber: row.serialNumber,
      status: row.status,
      usageHours: row.usageHours,
      location: row.location,
      responsibleId: row.responsibleId,
      notes: row.notes,
      preventiveIntervalHours: row.preventiveIntervalHours,
      lastPreventiveAtHours: row.lastPreventiveAtHours,
      tenantId: row.tenantId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
