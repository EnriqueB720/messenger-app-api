import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class ChatWhereInput {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  Id?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  uuid?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isGroup?: boolean;

}