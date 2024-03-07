import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/api/user/model/user.model';

@ObjectType()
export class Contact {
  @Field(() => Number, { nullable: true })
  userId?: Number;

  @Field(() => Number, { nullable: true })
  contactUserId?: Number;

  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => Boolean, { nullable: true })
  isFavorite?: Boolean;

  @Field(() => Boolean, { nullable: true })
  isBlocked?: Boolean;

  @Field(() => User, { nullable: true })
  contactUser?: User;
}