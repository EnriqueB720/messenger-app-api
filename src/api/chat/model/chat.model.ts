import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/api/message/model';

@ObjectType()
export class Chat {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Boolean, { nullable: true })
  isGroup?: boolean;

  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}