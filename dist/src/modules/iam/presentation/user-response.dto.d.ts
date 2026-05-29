import type { UserRole, UserStatus } from '@prisma/client';
import type { User } from '../domain/user.entity';
export declare class UserResponseDto {
    id: string;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    role: UserRole;
    status: UserStatus;
    tenantId: string | null;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    static from(u: User): UserResponseDto;
}
