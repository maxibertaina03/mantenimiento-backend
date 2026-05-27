import { Inject, Injectable } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from '../domain/user.repository';
import { ListUsersInput } from './dtos/list-users.input';
import { ListUsersOutput, UserListItemDto } from './dtos/list-users.output';

@Injectable()
export class ListUsersUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(input: ListUsersInput): Promise<ListUsersOutput> {
    const { items, total } = await this.userRepository.list({
      skip: input.skip,
      take: input.take,
    });

    const userItems: UserListItemDto[] = items.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    }));

    return {
      items: userItems,
      total,
    };
  }
}
