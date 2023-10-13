import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { ChatParticipant, ChatParticipantSelect } from './model';

import { ChatParticipantArgs, ChatParticipantCreateInput } from './dto';

import { ChatParticipantService } from './chat-participant.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';


@Resolver(() => ChatParticipant)
export class ChatParticipantResolver {
  constructor(private readonly ChatParticipantService: ChatParticipantService) {}

  @Query(() => [ChatParticipant])
  public async ChatParticipant(
    @Args() args: ChatParticipantArgs,
    @GraphQLFields() { fields }: IGraphQLFields<ChatParticipantSelect>,
  ): Promise<ChatParticipant[]> {
    return this.ChatParticipantService.findMany(args, fields);
  }

  @Mutation(() => ChatParticipant)
  public async createNewGroupParticipant(
    @Args('data') data: ChatParticipantCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<ChatParticipantSelect>,
  ): Promise<ChatParticipant> {
    return this.ChatParticipantService.createNewGroupParticipant(data, fields);
  }
}
