import { UserRepository } from '../domain/user.repository';
import { UserResponseDto } from '../presentation/user-response.dto';
export declare class GetUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string): Promise<UserResponseDto>;
}
