import { ArgsType, Field } from '@nestjs/graphql';

import { ChatWhereUniqueInput } from './chat-where-unique.input';

@ArgsType()
export class ChatArgs {
  @Field(() => ChatWhereUniqueInput)
  where: ChatWhereUniqueInput;
}
