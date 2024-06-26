import { Field, InputType, Int } from '@nestjs/graphql';

import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => Int)
  phoneNumber: number;

  @MinLength(4)
  @MaxLength(60)
  @Field(() => String)
  username: string;

  @MinLength(8)
  @Field(() => String)
  passwordHash: string;

  @MaxLength(100)
  @Field(() => String)
  fullName: string;
}