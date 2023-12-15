import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UserMessageStatusWhereInput {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  messageId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  userId?: number;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isRead?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable:true })
  isFavorite?: boolean;

  @IsOptional()
  @Field(()=> Boolean, { nullable: true })
  isReceived?: boolean;

}