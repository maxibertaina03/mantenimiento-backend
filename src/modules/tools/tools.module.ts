import { Module } from '@nestjs/common';

import { ToolsController } from './presentation/tools.controller';
import { TOOL_REPOSITORY } from './domain/tool.repository';
import { PrismaToolRepository } from './infrastructure/prisma-tool.repository';

import { RegisterToolUseCase } from './application/register-tool.use-case';
import { UpdateToolUseCase } from './application/update-tool.use-case';
import { ChangeToolStatusUseCase } from './application/change-tool-status.use-case';
import { LoanToolUseCase } from './application/loan-tool.use-case';
import { ReturnToolUseCase } from './application/return-tool.use-case';
import { ListToolsUseCase } from './application/list-tools.use-case';
import { GetToolUseCase } from './application/get-tool.use-case';
import { ListLoansUseCase } from './application/list-loans.use-case';
import { DeleteToolUseCase } from './application/delete-tool.use-case';

@Module({
  controllers: [ToolsController],
  providers: [
    { provide: TOOL_REPOSITORY, useClass: PrismaToolRepository },
    RegisterToolUseCase,
    UpdateToolUseCase,
    ChangeToolStatusUseCase,
    LoanToolUseCase,
    ReturnToolUseCase,
    ListToolsUseCase,
    GetToolUseCase,
    ListLoansUseCase,
    DeleteToolUseCase,
  ],
})
export class ToolsModule {}
