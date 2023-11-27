import { Field, ObjectType } from '@nestjs/graphql';
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