import { Module } from '@nestjs/common';

import { ChatModule, ChatParticipantModule, ContactModule, MessageModule, UserMessageStatusModule, UserModule } from '@apis';
import { AuthModule } from './shared/auth/auth.module';

import { ConfigModule } from 'src/shared/config/config.module';
import { PrismaModule } from './shared/datasource/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

//Hacer el index para los apis


@Module({
  imports: [
    JwtModule.register({
      global: true, 
      secret: process.env.JWT_SECRET
    }),
    ConfigModule,
    UserModule,
    PrismaModule,
    ContactModule,
    ChatModule,
    MessageModule,
    ChatParticipantModule,
    UserMessageStatusModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
