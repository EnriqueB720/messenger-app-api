import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Contact, ContactSelect } from './model';

import { ContactArgs, ContactCreateInput, ContactUpdateInput } from './dto';

import { ContactService } from './contact.service';

import { GraphQLFields, IGraphQLFields } from '@decorators';
import { Body, Delete, Param, Put } from '@nestjs/common';


@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) { }

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

  @Delete()
  remove(
    @Args() args: ContactArgs,
    @GraphQLFields() { fields }: IGraphQLFields<ContactSelect>):
    Promise<Contact> {
    return this.contactService.delete(args, fields);
  }

  @Put()
  update(
    @Args() data: ContactUpdateInput,
    @GraphQLFields() { fields }: IGraphQLFields<ContactSelect>):
    Promise<Contact> {
    return this.contactService.update(new ContactArgs(), fields, data);
  }

}
