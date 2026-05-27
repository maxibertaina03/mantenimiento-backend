import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Tool } from '../../domain/entities/tool.entity';
import { IToolRepository } from '../../domain/repositories/tool.repository';
import { PrismaToolMapper } from '../mappers/prisma-tool.mapper';

@Injectable()
export class PrismaToolRepository implements IToolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(tool: Tool): Promise<void> {
    const data = PrismaToolMapper.toPersistence(tool);
    await this.prisma.tool.upsert({
      where: { id: tool.getId() },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<Tool | null> {
    const raw = await this.prisma.tool.findUnique({ where: { id } });
    return raw ? PrismaToolMapper.toDomain(raw) : null;
  }

  async findByCode(code: string): Promise<Tool | null> {
    const raw = await this.prisma.tool.findUnique({ where: { code } });
    return raw ? PrismaToolMapper.toDomain(raw) : null;
  }

  async findAll(tenantId?: string | null): Promise<Tool[]> {
    const tools = await this.prisma.tool.findMany({
      where: tenantId ? { tenantId } : {},
    });
    return tools.map((raw) => PrismaToolMapper.toDomain(raw));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tool.delete({ where: { id } });
  }
}
