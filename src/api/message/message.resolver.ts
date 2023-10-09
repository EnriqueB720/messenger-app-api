import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Message, MessageSelect } from './model';

import { MessageArgs, MessageCreateInput } from './dto';

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
  public async createMessage(
    @Args('data') data: MessageCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<MessageSelect>,
  ): Promise<Message> {
    return this.messageService.create(data, fields);
  }
}
