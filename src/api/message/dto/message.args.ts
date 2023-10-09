import { ArgsType, Field } from '@nestjs/graphql';

import { MessageWhereUniqueInput } from './message-where-unique.input';

@ArgsType()
export class MessageArgs {
  @Field(() => MessageWhereUniqueInput)
  where: MessageWhereUniqueInput;
}
