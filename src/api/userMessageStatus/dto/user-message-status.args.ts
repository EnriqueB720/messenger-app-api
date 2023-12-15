import { IsOptional, Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { UserMessageStatusWhereUniqueInput } from './user-message-status-where-unique.input';
import { UserMessageStatusOrderByInput } from './user-message-status-order-by.input';
import { UserMessageStatusWhereInput } from './user-message-status-where.input';


@ArgsType()
export class UserMessageStatusArgs {
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
  @Field(() => UserMessageStatusWhereUniqueInput, { nullable: true })
  cursor?: UserMessageStatusWhereUniqueInput;

  @IsOptional()
  @Field(() => UserMessageStatusOrderByInput, { nullable: true })
  orderBy?: UserMessageStatusOrderByInput;

  @IsOptional()
  @Field(() => UserMessageStatusWhereInput, { nullable: true })
  where?: UserMessageStatusWhereInput;
}