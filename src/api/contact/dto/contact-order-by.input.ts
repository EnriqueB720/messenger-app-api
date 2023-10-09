import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { OrderByArg } from 'src/shared/util';

@InputType()
export class ContactOrderByInput {
  @IsOptional()
  @Field(() => OrderByArg, { nullable: true })
  fullName?: OrderByArg;

  @IsOptional()
  @Field(() => OrderByArg, { nullable: true })
  isFavorite?: OrderByArg;

  @IsOptional()
  @Field(() => OrderByArg, { nullable: true })
  isBlocked?: OrderByArg;
}