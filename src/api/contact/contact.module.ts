import { Module } from '@nestjs/common';
import { ContactResolver } from './contact.resolver';

import { ContactService } from './contact.service';

@Module({
  imports: [],
  providers: [ContactResolver, ContactService],
  exports: [ContactResolver, ContactService],
})
export class ContactModule {}
