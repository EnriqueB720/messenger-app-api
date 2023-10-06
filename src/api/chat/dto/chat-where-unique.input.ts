import { InputType, Field, Int } from '@nestjs/graphql';
import { UserWhereUniqueInput } from 'src/api/user/dto';

@InputType()
export class ChatWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  uuid?: string;

}