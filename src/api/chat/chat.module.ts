import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';

import { ChatService } from './chat.service';

@Module({
  imports: [],
  providers: [ChatResolver, ChatService],
  exports: [ChatResolver, ChatService],
})
export class ChatModule {}
