import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ContactWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  contactUserId: number;

}