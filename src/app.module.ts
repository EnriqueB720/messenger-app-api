import { Module } from '@nestjs/common';

//Apis
import { UserModule } from './api/user/user.module';
import { ContactModule } from './api/contact/contact.module';
import { ChatModule } from './api/chat/chat.module';
import { MessageModule } from './api/message/message.module';
import { ChatParticipantModule } from './api/chat-participant/chat-participant.module';
//Shared
import { ConfigModule } from 'src/shared/config/config.module';
import { PrismaModule } from './shared/datasource/prisma/prisma.module';



@Module({
  imports: [
    ConfigModule,
    UserModule,
    PrismaModule,
    ContactModule,
    ChatModule,
    MessageModule,
    ChatParticipantModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
