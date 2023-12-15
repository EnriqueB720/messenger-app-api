import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserMessageStatusWhereUniqueInput {
  @Field(() => Int, { nullable:true })
  messageId: number;

  @Field(() => String, { nullable:true })
  userId: string;
}
