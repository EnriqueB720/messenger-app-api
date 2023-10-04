import { ArgsType, Field } from '@nestjs/graphql';

import { ContactWhereUniqueInput } from './contact-where-unique.input';

@ArgsType()
export class ContactArgs {
  @Field(() => ContactWhereUniqueInput)
  where: ContactWhereUniqueInput;
}
