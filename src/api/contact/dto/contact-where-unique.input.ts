import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ContactWhereUniqueInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  contactUserId: number;

}