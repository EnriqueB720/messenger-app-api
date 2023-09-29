import { ArgsType, Field } from '@nestjs/graphql';

import { UserWhereUniqueInput } from './user-where-unique.input';

@ArgsType()
export class UserArgs {
  @Field(() => UserWhereUniqueInput)
  where: UserWhereUniqueInput;
}
