import { InputType, Field, Int } from '@nestjs/graphql';
import { UserWhereUniqueInput } from 'src/api/user/dto';

@InputType()
export class ChatWhereUniqueInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uuid: string;

}