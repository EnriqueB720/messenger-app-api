import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserMessageStatus {
  @Field(() => Number, { nullable: true })
  messageId?: number;

  @Field(() => Number, { nullable: true })
  userId?: number;

  @Field(() => Boolean, { nullable: true })
  isRead?: boolean;

  @Field(() => Boolean, { nullable: true })
  isReceived?: boolean;

  @Field(() => Boolean, { nullable: true })
  isFavorite?: boolean;
}