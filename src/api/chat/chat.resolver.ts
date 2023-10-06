import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Chat, ChatSelect } from './model';

import { ChatArgs, ChatCreateInput } from './dto';

import { ChatService } from './chat.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';


@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => Chat)
  public async chat(
    @Args() args: ChatArgs,
    @GraphQLFields() { fields }: IGraphQLFields<ChatSelect>,
  ): Promise<Chat> {
    return this.chatService.findOne(args, fields);
  }

  @Mutation(() => Chat)
  public async createChat(
    @Args('data') data: ChatCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<ChatSelect>,
  ): Promise<Chat> {
    return this.chatService.create(data, fields);
  }

  
}