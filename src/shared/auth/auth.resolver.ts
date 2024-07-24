import { UseGuards } from '@nestjs/common';

import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignUpInput } from './dto';

import { GqlAuthGuard } from './guards';

import { AuthService } from './auth.service';

import { LoginUserInput, LoginOutput } from './dto';

import { GraphQLFields, IGraphQLFields } from '../decorators';

import { User, UserSelect } from 'src/api/user/model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseGuards(GqlAuthGuard)
  login(@Args('data') data: LoginUserInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(
    @Args('data') data: SignUpInput,
    @GraphQLFields() { fields }: IGraphQLFields<UserSelect>,
  ) {
    return this.authService.signup(data, fields);
  }
}