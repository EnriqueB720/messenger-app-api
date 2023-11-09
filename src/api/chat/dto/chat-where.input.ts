import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';


@InputType()
export class ChatParticipantWhereInput {

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Int, { nullable: true })
  contactUserId?: number;
}


@InputType()
export class ChatParticipantListRelationFilter {

  @Field(() => ChatParticipantWhereInput, { nullable: true })
  some?: ChatParticipantWhereInput;

  @Field(() => ChatParticipantWhereInput, { nullable: true })
  every?: ChatParticipantWhereInput;

  @Field(() => ChatParticipantWhereInput, { nullable: true })
  none?: ChatParticipantWhereInput;

}

@InputType()
export class ChatWhereInput {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id?: number;

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

  @IsOptional()
  @Field(() => Int, { nullable: true })
  userId?: number;

  @IsOptional()
  @Field(() => [ChatWhereInput], { nullable: true })
  AND?: ChatWhereInput[];

  @IsOptional()
  @Field(() => ChatParticipantListRelationFilter, { nullable: true })
  participants?: ChatParticipantListRelationFilter;
}


