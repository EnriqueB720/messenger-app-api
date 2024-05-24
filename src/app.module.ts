import { Module } from '@nestjs/common';

import { ChatModule, ChatParticipantModule, ContactModule, MessageModule, UserMessageStatusModule, UserModule } from '@apis';

import { ConfigModule } from 'src/shared/config/config.module';
import { PrismaModule } from './shared/datasource/prisma/prisma.module';

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
