import type { UserRole, UserStatus } from '@prisma/client';
export declare class UserListItemDto {
    id: string;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    fullName: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
}
export declare class ListUsersOutput {
    items: UserListItemDto[];
    total: number;
}
