import { type UserRepository } from '../domain/user.repository';
import type { User } from '../domain/user.entity';
export declare class GetCurrentUserUseCase {
    private readonly users;
    constructor(users: UserRepository);
    execute(userId: string): Promise<User>;
}
