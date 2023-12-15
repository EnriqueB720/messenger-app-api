import { Module } from '@nestjs/common';
import { UserMessageStatusResolver } from './user-message-status.resolver';

import { UserMessageStatusService } from './user-message-status.service';

@Module({
  imports: [],
  providers: [UserMessageStatusResolver, UserMessageStatusService],
  exports: [UserMessageStatusResolver, UserMessageStatusService],
})
export class UserMessageStatusModule {}
