import { Module } from '@nestjs/common';
import { ToolsController } from './presentation/controllers/tools.controller';
import { CreateToolUseCase } from './application/use-cases/create-tool/create-tool.use-case';
import { PrismaToolRepository } from './infrastructure/repositories/prisma-tool.repository';
import { TOOL_REPOSITORY } from './domain/repositories/tool.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ToolsController],
  providers: [
    CreateToolUseCase,
    {
      provide: TOOL_REPOSITORY,
      useClass: PrismaToolRepository,
    },
  ],
  exports: [CreateToolUseCase],
})
export class ToolsModule {}
