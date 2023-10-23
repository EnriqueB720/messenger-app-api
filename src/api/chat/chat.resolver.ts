import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Chat, ChatSelect } from './model';

import { ChatCreateInput, ChatsArgs } from './dto';

import { ChatService } from './chat.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';


@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [Chat])
  public async chats(
    @Args() args: ChatsArgs,
    @GraphQLFields() { fields }: IGraphQLFields<ChatSelect>,
  ): Promise<Chat[]> {
    return this.chatService.findMany(args, fields);
  }

  @Mutation(() => Chat)
  public async createGroupChat(
    @Args('data') data: ChatCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<ChatSelect>,
  ): Promise<Chat> {
    return this.chatService.createGroupChat(data, fields);
  }

  
}