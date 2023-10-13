import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ChatWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  uuid?: string;
}

@InputType()
export class ChatCreateNestedOneWithoutMessagesInput {
  @Field(() => ChatWhereUniqueInput)
  connect: ChatWhereUniqueInput
}

@InputType()
export class ChatCreateNestedOneWithoutParticipantsInput {
  @Field(() => ChatWhereUniqueInput)
  connect: ChatWhereUniqueInput
}