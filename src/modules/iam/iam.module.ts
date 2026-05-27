import { Module } from '@nestjs/common';
import { IamController } from './presentation/iam.controller';
import { GetCurrentUserUseCase } from './application/get-current-user.use-case';
import { ListUsersUseCase } from './application/list-users.use-case';
import { GetUserUseCase } from './application/get-user.use-case';
import { UpdateUserUseCase } from './application/update-user.use-case';
import { DeleteUserUseCase } from './application/delete-user.use-case';
import { USER_REPOSITORY } from './domain/user.repository';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';

@Module({
  controllers: [IamController],
  providers: [
    GetCurrentUserUseCase,
    ListUsersUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
  exports: [GetCurrentUserUseCase, ListUsersUseCase, GetUserUseCase, UpdateUserUseCase, DeleteUserUseCase],
})
export class IamModule {}
