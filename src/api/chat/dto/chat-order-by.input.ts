import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { OrderByArg } from 'src/shared/util';

@InputType()
export class ChatOrderByInput {
  @IsOptional()
  @Field(() => OrderByArg, { nullable: true })
  createdAt?: OrderByArg;

  @IsOptional()
  @Field(() => OrderByArg, { nullable: true })
  updatedAt?: OrderByArg;

  @IsOptional()
  @Field(() => OrderByArg, { nullable: true })
  name?: OrderByArg;
}