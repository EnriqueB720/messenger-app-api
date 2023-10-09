import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { OrderByArg } from 'src/shared/util';

@InputType()
export class MessageOrderByInput {
  @IsOptional()
  @Field(() => OrderByArg, { nullable: true })
  createdAt?: OrderByArg;
}