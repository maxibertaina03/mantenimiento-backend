import type { UserRole } from '@prisma/client';
export interface AuthenticatedUser {
    id: string;
    clerkUserId: string;
    username: string | null;
    email: string | null;
    role: UserRole;
    tenantId: string | null;
}
export declare const CurrentUser: (...dataOrPipes: (keyof AuthenticatedUser | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
