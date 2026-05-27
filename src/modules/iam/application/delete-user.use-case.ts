import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from '../domain/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.deactivate();
    await this.userRepository.save(user);
  }
}
