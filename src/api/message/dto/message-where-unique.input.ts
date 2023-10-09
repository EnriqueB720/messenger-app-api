import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class MessageWhereUniqueInput {
  @Field(() => Int, { nullable:true })
  id: number;

  @Field(() => String, { nullable:true })
  uuid?: string;

  @Field(() => Int, { nullable:true })
  senderId?: number;

  @Field(() => Int, { nullable:true })
  chatId?: number;

  @Field(() => Int, { nullable:true })
  replyMessageId?: number;
}
