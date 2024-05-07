import { Module } from '@nestjs/common';

import { UserModule } from './api/user/user.module';
import { ContactModule } from './api/contact/contact.module';
import { ChatModule } from './api/chat/chat.module';
import { MessageModule } from './api/message/message.module';
import { ChatParticipantModule } from './api/chat-participant/chat-participant.module';

import { ConfigModule } from 'src/shared/config/config.module';
import { PrismaModule } from './shared/datasource/prisma/prisma.module';
import { UserMessageStatusModule } from './api/userMessageStatus/user-message-status.module';
//Hacer el index para los apis


@Module({
  imports: [
    ConfigModule,
    UserModule,
    PrismaModule,
    ContactModule,
    ChatModule,
    MessageModule,
    ChatParticipantModule,
    UserMessageStatusModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
