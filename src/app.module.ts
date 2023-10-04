import { Module } from '@nestjs/common';


import { UserModule } from './api/user/user.module';
import { ContactModule } from './api/contact/contact.module';
//Shared
import { ConfigModule } from 'src/shared/config/config.module';
import { PrismaModule } from './shared/datasource/prisma/prisma.module';

@Module({
  imports: [ConfigModule,
            UserModule,
            PrismaModule,
            ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
