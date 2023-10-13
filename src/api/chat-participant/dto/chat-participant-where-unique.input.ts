import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ChatParticipantWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  chatId: number;

  @Field(() => Int, { nullable: true })
  userId: number;
}

