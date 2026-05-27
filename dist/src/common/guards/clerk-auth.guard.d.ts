import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClerkService } from '@/infrastructure/clerk/clerk.service';
import { UserSyncService } from '@/infrastructure/clerk/user-sync.service';
export declare class ClerkAuthGuard implements CanActivate {
    private readonly reflector;
    private readonly clerk;
    private readonly userSync;
    constructor(reflector: Reflector, clerk: ClerkService, userSync: UserSyncService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractBearer;
}
