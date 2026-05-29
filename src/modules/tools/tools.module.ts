import { Module } from '@nestjs/common';
import { ToolsController } from './presentation/controllers/tools.controller';
import { CreateToolUseCase } from './application/use-cases/create-tool/create-tool.use-case';
import { ListToolsUseCase } from './application/use-cases/list-tools/list-tools.use-case';
import { GetToolUseCase } from './application/use-cases/get-tool/get-tool.use-case';
import { UpdateToolUseCase } from './application/use-cases/update-tool/update-tool.use-case';
import { DeleteToolUseCase } from './application/use-cases/delete-tool/delete-tool.use-case';
import { LoanToolUseCase } from './application/use-cases/loan-tool/loan-tool.use-case';
import { ReturnToolUseCase } from './application/use-cases/return-tool/return-tool.use-case';
import { ListLoansUseCase } from './application/use-cases/list-loans/list-loans.use-case';
import { PrismaToolRepository } from './infrastructure/repositories/prisma-tool.repository';
import { TOOL_REPOSITORY } from './domain/repositories/tool.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ToolsController],
  providers: [
    CreateToolUseCase,
    ListToolsUseCase,
    GetToolUseCase,
    UpdateToolUseCase,
    DeleteToolUseCase,
    LoanToolUseCase,
    ReturnToolUseCase,
    ListLoansUseCase,
    {
      provide: TOOL_REPOSITORY,
      useClass: PrismaToolRepository,
    },
  ],
  exports: [
    CreateToolUseCase,
    ListToolsUseCase,
    GetToolUseCase,
    UpdateToolUseCase,
    DeleteToolUseCase,
    LoanToolUseCase,
    ReturnToolUseCase,
    ListLoansUseCase,
  ],
})
export class ToolsModule {}
