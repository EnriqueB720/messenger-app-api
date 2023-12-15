import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/api/user/model';

@ObjectType()
export class UserMessageStatus {
  @Field(() => Number, { nullable: true })
  messageId?: number;

  @Field(() => Number, { nullable: true })
  userId?: number;

  @Field(() => Boolean, { nullable: true })
  isRead?: boolean;

  @Field(() => Boolean, { nullable: true })
  isReceived?: boolean;

  @Field(() => Boolean, { nullable: true })
  isFavorite?: boolean;

  @Field(() => User, { nullable: true })
  user?: User;
}