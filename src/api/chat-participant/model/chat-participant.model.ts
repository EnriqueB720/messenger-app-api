import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/api/message/model';
import { User } from 'src/api/user/model/user.model';

@ObjectType()
export class ChatParticipant {
  @Field(() => Number, { nullable: true })
  chatId?: number;

  @Field(() => Number, { nullable: true })
  userId?: number;

  @Field(() => User, { nullable: true })
  user?: User;
}