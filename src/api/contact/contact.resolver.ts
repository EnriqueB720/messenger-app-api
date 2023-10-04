import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Contact, ContactSelect } from './model';

import { ContactArgs, ContactCreateInput } from './dto';

import { ContactService } from './contact.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';


@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => Contact)
  public async contact(
    @Args() args: ContactArgs,
    @GraphQLFields() { fields }: IGraphQLFields<ContactSelect>,
  ): Promise<Contact> {
    return this.contactService.findOne(args, fields);
  }

  @Mutation(() => Contact)
  public async createContact(
    @Args('data') data: ContactCreateInput,
    // @Context('user') user: IAuthUser,
    @GraphQLFields() { fields }: IGraphQLFields<ContactSelect>,
  ): Promise<Contact> {
    return this.contactService.create(data, fields);
  }

  
}
