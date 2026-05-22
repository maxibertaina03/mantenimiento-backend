import { Global, Module } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { UserSyncService } from './user-sync.service';

@Global()
@Module({
  providers: [ClerkService, UserSyncService],
  exports: [ClerkService, UserSyncService],
})
export class ClerkModule {}
