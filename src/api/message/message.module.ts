import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';

import { MessageService } from './message.service';

@Module({
  imports: [],
  providers: [MessageResolver, MessageService],
  exports: [MessageResolver, MessageService],
})
export class MessageModule {}
