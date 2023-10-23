import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { ChatParticipantResolver } from './chat-participant.resolver';

import { ChatParticipantService } from './chat-participant.service';

@Module({
  imports: [ChatModule],
  providers: [ChatParticipantResolver, ChatParticipantService],
  exports: [ChatParticipantResolver, ChatParticipantService],
})
export class ChatParticipantModule {}
