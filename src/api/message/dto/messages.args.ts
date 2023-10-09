import { IsOptional, Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { MessageWhereUniqueInput } from './message-where-unique.input';
import { MessageOrderByInput } from './message-order-by.input';
import { MessageWhereInput } from './message-where.input';


@ArgsType()
export class MessagesArgs {
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
  @Field(() => MessageWhereUniqueInput, { nullable: true })
  cursor?: MessageWhereUniqueInput;

  @IsOptional()
  @Field(() => MessageOrderByInput, { nullable: true })
  orderBy?: MessageOrderByInput;

  @IsOptional()
  @Field(() => MessageWhereInput, { nullable: true })
  where?: MessageWhereInput;
}