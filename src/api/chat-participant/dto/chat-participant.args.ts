import { ArgsType, Field } from '@nestjs/graphql';

import { ChatParticipantWhereUniqueInput } from './chat-participant-where-unique.input';

@ArgsType()
export class ChatParticipantArgs {
  @Field(() => ChatParticipantWhereUniqueInput)
  where: ChatParticipantWhereUniqueInput;
}
