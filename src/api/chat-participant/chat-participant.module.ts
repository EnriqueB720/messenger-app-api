import { Module } from '@nestjs/common';
import { ChatParticipantResolver } from './chat-participant.resolver';

import { ChatParticipantService } from './chat-participant.service';

@Module({
  imports: [],
  providers: [ChatParticipantResolver, ChatParticipantService],
  exports: [ChatParticipantResolver, ChatParticipantService],
})
export class ChatParticipantModule {}
