import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Contact, ContactSelect } from './model';

import { ContactCreateInput } from './dto';

import { ContactService } from './contact.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';
import { ContactsArgs } from './dto/contacts.args';


@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) { }

  @Query(() => [Contact])
  public async contacts(
    @Args() args: ContactsArgs,
    @GraphQLFields() { fields }: IGraphQLFields<ContactSelect>,
  ): Promise<Contact[]> {
    return this.contactService.findMany(args, fields);
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
