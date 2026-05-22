import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { USER_REPOSITORY, type UserRepository } from '../domain/user.repository';
import type { User } from '../domain/user.entity';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly users: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.users.findById(userId);
    if (!user) throw new NotFoundError('User', userId);
    return user;
  }
}
