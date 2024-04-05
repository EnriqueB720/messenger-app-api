import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { UserModule } from '../user/user.module';
import { ContactResolver } from './contact.resolver';

import { ContactService } from './contact.service';

@Module({
  imports: [UserModule, ChatModule],
  providers: [ContactResolver, ContactService],
  exports: [ContactResolver, ContactService],
})
export class ContactModule {}
