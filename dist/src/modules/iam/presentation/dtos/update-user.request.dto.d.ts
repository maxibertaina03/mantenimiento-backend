import type { UserRole } from '@prisma/client';
export declare class UpdateUserRequestDto {
    firstName?: string | null;
    lastName?: string | null;
    role?: UserRole;
}
