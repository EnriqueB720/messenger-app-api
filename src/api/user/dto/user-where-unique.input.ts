import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email: string;
}

@InputType()
export class UserCreateNestedOneWithoutContactsInput {
  @Field(() => UserWhereUniqueInput)
  connect: UserWhereUniqueInput
}
