import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { UserMessageStatus, UserMessageStatusSelect } from './model';

import { UpdateUserMessageStatus, UserMessageStatusArgs } from './dto';

import { UserMessageStatusService } from './user-message-status.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';


@Resolver(() => UserMessageStatus)
export class UserMessageStatusResolver {
  constructor(private readonly UserMessageStatusService: UserMessageStatusService) { }

  @Query(() => [UserMessageStatus])
  public async userMessageStatus(
    @Args() args: UserMessageStatusArgs,
    @GraphQLFields() { fields }: IGraphQLFields<UserMessageStatusSelect>,
  ): Promise<UserMessageStatus[]> {
    return this.UserMessageStatusService.findMany(args, fields);
  }

  @Mutation(() => UserMessageStatus)
  public async updateMessageStatus(
    @Args('data') data: UpdateUserMessageStatus,
    @GraphQLFields() { fields }: IGraphQLFields<UserMessageStatusSelect>,
  ): Promise<UserMessageStatus> {
    return this.UserMessageStatusService.update(data, fields);
  }
}
