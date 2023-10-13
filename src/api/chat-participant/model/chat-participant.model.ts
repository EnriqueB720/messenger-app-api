import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/api/message/model';

@ObjectType()
export class ChatParticipant {
  @Field(() => Number, { nullable: true })
  chatId?: number;

  @Field(() => Number, { nullable: true })
  userId?: number;
}