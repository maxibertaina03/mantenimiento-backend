import { Module } from '@nestjs/common';
import { ToolsController } from './presentation/controllers/tools.controller';
import { CreateToolUseCase } from './application/use-cases/create-tool/create-tool.use-case';
import { ListToolsUseCase } from './application/use-cases/list-tools/list-tools.use-case';
import { GetToolUseCase } from './application/use-cases/get-tool/get-tool.use-case';
import { UpdateToolUseCase } from './application/use-cases/update-tool/update-tool.use-case';
import { DeleteToolUseCase } from './application/use-cases/delete-tool/delete-tool.use-case';
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
    {
      provide: TOOL_REPOSITORY,
      useClass: PrismaToolRepository,
    },
  ],
  exports: [CreateToolUseCase, ListToolsUseCase, GetToolUseCase, UpdateToolUseCase, DeleteToolUseCase],
})
export class ToolsModule {}
