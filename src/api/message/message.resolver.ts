import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Message, MessageSelect } from './model';

import { DirectMessageCreateInput, GroupMessageCreateInput } from './dto';

import { MessageService } from './message.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';
import { MessagesArgs } from './dto/messages.args';


@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  public async messages(
    @Args() args: MessagesArgs,
    @GraphQLFields() { fields }: IGraphQLFields<MessageSelect>,
  ): Promise<Message[]> {
    return this.messageService.findMany(args, fields);
  }

  @Mutation(() => Message)
  public async createDirectMessage(
    @Args('data') data: DirectMessageCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<MessageSelect>,
  ): Promise<Message> {
    return this.messageService.createDirectMessage(data, fields);
  }

  @Mutation(() => Message)
  public async createGroupMessage(
    @Args('data') data: GroupMessageCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<MessageSelect>,
  ): Promise<Message> {
    return this.messageService.createGroupMessage(data, fields);
  }

}
