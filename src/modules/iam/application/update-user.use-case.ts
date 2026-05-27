import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from '../domain/user.repository';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserResponseDto } from '../presentation/user-response.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUserInput): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new NotFoundException(`User with ID ${input.id} not found`);
    }

    if (input.role) {
      user.changeRole(input.role);
    }

    const updated = await this.userRepository.save(user);

    return {
      id: updated.id,
      username: updated.username,
      email: updated.email,
      firstName: updated.firstName,
      lastName: updated.lastName,
      fullName: updated.fullName,
      role: updated.role,
      status: updated.status,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }
}
