import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class ContactWhereInput {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  userId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  contactUserId?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  fullName?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isFavorite?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isBlocked?: boolean;

}