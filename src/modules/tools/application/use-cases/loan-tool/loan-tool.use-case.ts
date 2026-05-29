import { Inject, Injectable } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { IToolRepository, TOOL_REPOSITORY } from '../../../domain/repositories/tool.repository';
import { ToolNotFoundException } from '../../../domain/exceptions/tool-not-found.exception';
import { InvalidToolException } from '../../../domain/exceptions/invalid-tool.exception';
import { ToolStatus } from '../../../domain/value-objects/tool-status.vo';
import { PrismaToolMapper } from '../../../infrastructure/mappers/prisma-tool.mapper';
import { ToolAppMapper } from '../../mappers/tool-app.mapper';
import { LoanToolInput } from '../../dtos/loan-tool.input';
import { ToolLoanOutput } from '../../dtos/tool-loan.output';
import type { CreateToolOutput } from '../../dtos/create-tool.output';

export interface LoanToolOutput {
  tool: CreateToolOutput;
  loan: ToolLoanOutput;
}

/**
 * Presta una herramienta a un usuario.
 * Reglas:
 *  - La herramienta debe estar AVAILABLE.
 *  - Se crea un ToolLoan en estado ACTIVE.
 *  - La herramienta pasa a ON_LOAN.
 * Atómico (transacción Prisma).
 */
@Injectable()
export class LoanToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY) private readonly repository: IToolRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: LoanToolInput): Promise<LoanToolOutput> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) throw new ToolNotFoundException(input.toolId);

    if (tool.getStatus() !== ToolStatus.AVAILABLE) {
      throw new InvalidToolException(
        `La herramienta no está disponible (estado actual: ${tool.getStatus()})`,
      );
    }

    tool.changeStatus(ToolStatus.ON_LOAN);

    const loanId = generateUUID();
    const now = new Date();
    const toolData = PrismaToolMapper.toPersistence(tool);

    await this.prisma.$transaction([
      this.prisma.tool.update({
        where: { id: tool.getId() },
        data: toolData,
      }),
      this.prisma.toolLoan.create({
        data: {
          id: loanId,
          toolId: tool.getId(),
          responsibleId: input.responsibleId,
          loanedAt: now,
          expectedAt: input.expectedAt ?? null,
          status: 'ACTIVE',
          notes: input.notes ?? null,
          tenantId: input.tenantId ?? null,
        },
      }),
    ]);

    return {
      tool: ToolAppMapper.toOutput(tool),
      loan: {
        id: loanId,
        toolId: tool.getId(),
        responsibleId: input.responsibleId,
        loanedAt: now,
        expectedAt: input.expectedAt ?? null,
        returnedAt: null,
        status: 'ACTIVE',
        notes: input.notes ?? null,
        createdAt: now,
      },
    };
  }
}
