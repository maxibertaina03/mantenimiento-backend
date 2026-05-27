import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { User } from '../domain/user.entity';
import type { UserRepository } from '../domain/user.repository';
export declare class PrismaUserRepository implements UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    private toDomain;
}
