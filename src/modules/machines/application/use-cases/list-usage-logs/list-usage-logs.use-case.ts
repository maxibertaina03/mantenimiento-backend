import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { UsageLogOutput } from '../../dtos/usage-log.output';

export interface ListUsageLogsInput {
  machineId: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class ListUsageLogsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: ListUsageLogsInput): Promise<UsageLogOutput[]> {
    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 50;

    const logs = await this.prisma.machineUsageLog.findMany({
      where: { machineId: input.machineId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return logs.map((l) => ({
      id: l.id,
      machineId: l.machineId,
      hoursBefore: l.hoursBefore,
      hoursAfter: l.hoursAfter,
      delta: l.delta,
      notes: l.notes,
      createdById: l.createdById,
      createdAt: l.createdAt,
    }));
  }
}
