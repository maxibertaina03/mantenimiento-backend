import { Module } from '@nestjs/common';
import { IamController } from './presentation/iam.controller';
import { GetCurrentUserUseCase } from './application/get-current-user.use-case';
import { USER_REPOSITORY } from './domain/user.repository';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';

@Module({
  controllers: [IamController],
  providers: [
    GetCurrentUserUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
  exports: [GetCurrentUserUseCase],
})
export class IamModule {}
