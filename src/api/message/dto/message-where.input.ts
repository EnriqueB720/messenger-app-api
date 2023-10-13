import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class MessageWhereInput {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  uuid?: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  senderId?: number;

  @IsOptional()
  @Field(() => Int, { nullable:true })
  chatId?: number;

  @IsOptional()
  @Field(()=> String, { nullable: true })
  text?: string;

  @IsOptional()
  @Field(()=> Date, { nullable: true })
  createdAt?: Date;

  @IsOptional()
  @Field(()=> Date, { nullable: true })
  updatedAt?: Date;

  @IsOptional()
  @Field(() => Int, { nullable:true })
  replyMessageId?: number;

}