import type { UserRole } from '@prisma/client';
export declare class UpdateUserInput {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: UserRole;
}
