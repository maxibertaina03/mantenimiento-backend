import { UserRepository } from '../domain/user.repository';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserResponseDto } from '../presentation/user-response.dto';
export declare class UpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: UpdateUserInput): Promise<UserResponseDto>;
}
