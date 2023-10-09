import { IsOptional, Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { ChatWhereUniqueInput } from './chat-where-unique.input';
import { ChatOrderByInput } from './chat-order-by.input';
import { ChatWhereInput } from './chat-where.input';


@ArgsType()
export class ChatsArgs {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  @Min(0)
  skip?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(50)
  take?: number;

  @IsOptional()
  @Field(() => ChatWhereUniqueInput, { nullable: true })
  cursor?: ChatWhereUniqueInput;

  @IsOptional()
  @Field(() => ChatOrderByInput, { nullable: true })
  orderBy?: ChatOrderByInput;

  @IsOptional()
  @Field(() => ChatWhereInput, { nullable: true })
  where?: ChatWhereInput;
}