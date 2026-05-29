import { UserRepository } from '../domain/user.repository';
import { ListUsersInput } from './dtos/list-users.input';
import { ListUsersOutput } from './dtos/list-users.output';
export declare class ListUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: ListUsersInput): Promise<ListUsersOutput>;
}
