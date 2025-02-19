import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Chat, ChatSelect } from './model';

import { ChatArgs, ChatCreateInput, ChatsArgs } from './dto';

import { ChatService } from './chat.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';
import { JwtAuthGuard } from 'src/shared/auth/guards';
import { UseGuards } from '@nestjs/common';


@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => Chat)
  public async chat(
    @Args() args: ChatArgs,
    @GraphQLFields() { fields }: IGraphQLFields<ChatSelect>,
  ): Promise<Chat> {
    return this.chatService.findUnique(args, fields);
  }

  @Query(() => [Chat])
  // @UseGuards(JwtAuthGuard)
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