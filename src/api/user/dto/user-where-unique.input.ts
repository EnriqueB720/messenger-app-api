import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => Int, { nullable: true })
  phoneNumber: number;

  @Field(() => String, { nullable: true })
  email?: string;
}

@InputType()
export class UserCreateNestedOneWithoutContactsInput {
  @Field(() => UserWhereUniqueInput)
  connect: UserWhereUniqueInput
}

@InputType()
export class UserCreateNestedOneWithoutMessagesInput {
  @Field(() => UserWhereUniqueInput)
  connect: UserWhereUniqueInput
}

@InputType()
export class UserCreateNestedOneWithoutChatParticipantsInput {
  @Field(() => UserWhereUniqueInput)
  connect: UserWhereUniqueInput
}
