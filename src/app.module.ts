import { Module } from '@nestjs/common';

//Apis
import { UserModule } from './api/user/user.module';
import { ContactModule } from './api/contact/contact.module';
import { ChatModule } from './api/chat/chat.module';
//Shared
import { ConfigModule } from 'src/shared/config/config.module';
import { PrismaModule } from './shared/datasource/prisma/prisma.module';

@Module({
  imports: [ConfigModule,
            UserModule,
            PrismaModule,
            ContactModule,
            ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
