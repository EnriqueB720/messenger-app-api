import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Contact } from 'src/api/contact/model';
import { Message } from 'src/api/message/model';

@ObjectType()
export class User {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Int, { nullable: true })
  phoneNumber?: number;

  @Field(() => Role, { nullable: true })
  type?: Role;

  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => [Contact], { nullable: true })
  contacts?: Contact[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}

registerEnumType(Role, {
  name: 'Role',
});
