import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { ToolLoanOutput, type ToolLoanStatus } from '../../dtos/tool-loan.output';

export interface ListLoansInput {
  toolId: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class ListLoansUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: ListLoansInput): Promise<ToolLoanOutput[]> {
    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 50;

    const loans = await this.prisma.toolLoan.findMany({
      where: { toolId: input.toolId },
      orderBy: { loanedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return loans.map((l) => ({
      id: l.id,
      toolId: l.toolId,
      responsibleId: l.responsibleId,
      loanedAt: l.loanedAt,
      expectedAt: l.expectedAt,
      returnedAt: l.returnedAt,
      status: l.status as ToolLoanStatus,
      notes: l.notes,
      createdAt: l.createdAt,
    }));
  }
}
