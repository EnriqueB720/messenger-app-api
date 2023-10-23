import { Field, ObjectType } from '@nestjs/graphql';
import { UserMessageStatus } from 'src/api/userMessageStatus/model';

@ObjectType()
export class Message {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => Number, { nullable: true })
  chatId?: number;

  @Field(() => Number, { nullable: true })
  senderId?: number;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Number, { nullable: true })
  replyMessageId?: number;

  @Field(() => UserMessageStatus, {nullable: true})
  userMessageStatus?: UserMessageStatus;
}