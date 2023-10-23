import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { MessageResolver } from './message.resolver';

import { MessageService } from './message.service';

@Module({
  imports: [ChatModule],
  providers: [MessageResolver, MessageService],
  exports: [MessageResolver, MessageService],
})
export class MessageModule {}
