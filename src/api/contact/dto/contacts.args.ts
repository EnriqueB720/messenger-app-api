import { IsOptional, Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { ContactWhereUniqueInput } from './contact-where-unique.input';
import { ContactOrderByInput } from './contact-order-by.input';
import { ContactWhereInput } from './contact-where.input';


@ArgsType()
export class ContactsArgs {
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
  @Field(() => ContactWhereUniqueInput, { nullable: true })
  cursor?: ContactWhereUniqueInput;

  @IsOptional()
  @Field(() => ContactOrderByInput, { nullable: true })
  orderBy?: ContactOrderByInput;

  @IsOptional()
  @Field(() => ContactWhereInput, { nullable: true })
  where?: ContactWhereInput;
}