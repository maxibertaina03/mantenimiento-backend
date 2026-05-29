import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { IToolRepository, TOOL_REPOSITORY } from '../../../domain/repositories/tool.repository';
import { ToolNotFoundException } from '../../../domain/exceptions/tool-not-found.exception';
import { InvalidToolException } from '../../../domain/exceptions/invalid-tool.exception';
import { ToolStatus } from '../../../domain/value-objects/tool-status.vo';
import { PrismaToolMapper } from '../../../infrastructure/mappers/prisma-tool.mapper';
import { ToolAppMapper } from '../../mappers/tool-app.mapper';
import { ToolLoanOutput, type ToolLoanStatus } from '../../dtos/tool-loan.output';
import type { CreateToolOutput } from '../../dtos/create-tool.output';

export interface ReturnToolOutput {
  tool: CreateToolOutput;
  loan: ToolLoanOutput;
}

/**
 * Devuelve una herramienta prestada.
 * Reglas:
 *  - Busca el préstamo ACTIVE más reciente de la herramienta.
 *  - Marca el préstamo como RETURNED con returnedAt = now.
 *  - La herramienta vuelve a AVAILABLE.
 */
@Injectable()
export class ReturnToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY) private readonly repository: IToolRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(toolId: string): Promise<ReturnToolOutput> {
    const tool = await this.repository.findById(toolId);
    if (!tool) throw new ToolNotFoundException(toolId);

    if (tool.getStatus() !== ToolStatus.ON_LOAN) {
      throw new InvalidToolException(
        `La herramienta no está prestada (estado actual: ${tool.getStatus()})`,
      );
    }

    const activeLoan = await this.prisma.toolLoan.findFirst({
      where: { toolId, status: 'ACTIVE' },
      orderBy: { loanedAt: 'desc' },
    });
    if (!activeLoan) {
      throw new InvalidToolException('No se encontró un préstamo activo para esta herramienta');
    }

    tool.changeStatus(ToolStatus.AVAILABLE);

    const now = new Date();
    const toolData = PrismaToolMapper.toPersistence(tool);

    const [, updatedLoan] = await this.prisma.$transaction([
      this.prisma.tool.update({
        where: { id: tool.getId() },
        data: toolData,
      }),
      this.prisma.toolLoan.update({
        where: { id: activeLoan.id },
        data: { status: 'RETURNED', returnedAt: now },
      }),
    ]);

    return {
      tool: ToolAppMapper.toOutput(tool),
      loan: {
        id: updatedLoan.id,
        toolId: updatedLoan.toolId,
        responsibleId: updatedLoan.responsibleId,
        loanedAt: updatedLoan.loanedAt,
        expectedAt: updatedLoan.expectedAt,
        returnedAt: updatedLoan.returnedAt,
        status: updatedLoan.status as ToolLoanStatus,
        notes: updatedLoan.notes,
        createdAt: updatedLoan.createdAt,
      },
    };
  }
}
