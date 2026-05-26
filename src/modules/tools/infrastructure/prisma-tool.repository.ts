import { Injectable } from '@nestjs/common';
import { Prisma, type Tool as PrismaTool } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { ConflictError } from '@/common/exceptions/domain.exception';
import { Tool } from '../domain/tool.entity';
import type {
  CreateLoanProps,
  CreateToolProps,
  ListToolsQuery,
  ToolLoanRecord,
  ToolRepository,
} from '../domain/tool.repository';

@Injectable()
export class PrismaToolRepository implements ToolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(props: CreateToolProps): Promise<Tool> {
    const row = await this.prisma.tool.create({
      data: {
        code: props.code,
        name: props.name,
        description: props.description ?? null,
        brand: props.brand ?? null,
        model: props.model ?? null,
        serialNumber: props.serialNumber ?? null,
        status: props.status ?? 'AVAILABLE',
        location: props.location ?? null,
        observations: props.observations ?? null,
        acquiredAt: props.acquiredAt ?? null,
        tenantId: props.tenantId ?? null,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Tool | null> {
    const row = await this.prisma.tool.findFirst({ where: { id, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async findByCode(code: string): Promise<Tool | null> {
    const row = await this.prisma.tool.findFirst({ where: { code, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async list(query: ListToolsQuery): Promise<{ items: Tool[]; total: number }> {
    const where: Prisma.ToolWhereInput = {
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
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
      this.prisma.tool.findMany({
        where,
        skip: query.skip ?? 0,
        take: query.take ?? 20,
        orderBy: [{ status: 'asc' }, { name: 'asc' }],
      }),
      this.prisma.tool.count({ where }),
    ]);
    return { items: rows.map((r) => this.toDomain(r)), total };
  }

  async save(tool: Tool): Promise<Tool> {
    const row = await this.prisma.tool.update({
      where: { id: tool.id },
      data: {
        name: tool.name,
        description: tool.description,
        brand: tool.brand,
        model: tool.model,
        serialNumber: tool.serialNumber,
        status: tool.status,
        location: tool.location,
        observations: tool.observations,
        acquiredAt: tool.acquiredAt,
      },
    });
    return this.toDomain(row);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.tool.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async createLoanWithToolUpdate(tool: Tool, props: CreateLoanProps): Promise<ToolLoanRecord> {
    // Acopla update de tool + creación del préstamo activo.
    // Se chequea que no exista otro préstamo activo simultáneo.
    return this.prisma.$transaction(async (tx) => {
      const active = await tx.toolLoan.findFirst({
        where: { toolId: tool.id, status: 'ACTIVE' },
      });
      if (active) {
        throw new ConflictError(
          'LOAN_ALREADY_ACTIVE',
          'La herramienta ya tiene un préstamo activo',
        );
      }
      await tx.tool.update({
        where: { id: tool.id },
        data: { status: tool.status },
      });
      return tx.toolLoan.create({
        data: {
          toolId: props.toolId,
          responsibleId: props.responsibleId,
          expectedAt: props.expectedAt ?? null,
          notes: props.notes ?? null,
          tenantId: props.tenantId ?? null,
          status: 'ACTIVE',
        },
      });
    });
  }

  async closeActiveLoan(tool: Tool, returnedAt: Date): Promise<ToolLoanRecord> {
    return this.prisma.$transaction(async (tx) => {
      const active = await tx.toolLoan.findFirst({
        where: { toolId: tool.id, status: 'ACTIVE' },
      });
      if (!active) {
        throw new ConflictError(
          'NO_ACTIVE_LOAN',
          'No hay un préstamo activo para esta herramienta',
        );
      }
      await tx.tool.update({
        where: { id: tool.id },
        data: { status: tool.status },
      });
      return tx.toolLoan.update({
        where: { id: active.id },
        data: { status: 'RETURNED', returnedAt },
      });
    });
  }

  async findActiveLoan(toolId: string): Promise<ToolLoanRecord | null> {
    return this.prisma.toolLoan.findFirst({
      where: { toolId, status: 'ACTIVE' },
      orderBy: { loanedAt: 'desc' },
    });
  }

  async listLoans(toolId: string, skip = 0, take = 20): Promise<ToolLoanRecord[]> {
    return this.prisma.toolLoan.findMany({
      where: { toolId },
      orderBy: { loanedAt: 'desc' },
      skip,
      take,
    });
  }

  async countActiveLoans(tenantId?: string | null): Promise<number> {
    return this.prisma.toolLoan.count({
      where: {
        status: 'ACTIVE',
        ...(tenantId !== undefined ? { tenantId } : {}),
      },
    });
  }

  private toDomain(row: PrismaTool): Tool {
    return Tool.rehydrate({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      brand: row.brand,
      model: row.model,
      serialNumber: row.serialNumber,
      status: row.status,
      location: row.location,
      observations: row.observations,
      acquiredAt: row.acquiredAt,
      tenantId: row.tenantId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
