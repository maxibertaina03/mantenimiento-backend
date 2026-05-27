import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { ClerkService } from './clerk.service';
import type { AuthenticatedUser } from '@/common/decorators/current-user.decorator';
export declare class UserSyncService {
    private readonly prisma;
    private readonly clerk;
    constructor(prisma: PrismaService, clerk: ClerkService);
    ensureUser(clerkUserId: string): Promise<AuthenticatedUser>;
    private findExistingMatch;
    private assertActive;
    private toAuthenticated;
}
