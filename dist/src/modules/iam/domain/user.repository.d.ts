import type { User } from './user.entity';
export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByClerkId(clerkUserId: string): Promise<User | null>;
    save(user: User): Promise<User>;
    list(params: {
        skip?: number;
        take?: number;
    }): Promise<{
        items: User[];
        total: number;
    }>;
}
export declare const USER_REPOSITORY: unique symbol;
