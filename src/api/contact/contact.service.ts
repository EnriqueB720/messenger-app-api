import { Injectable } from '@nestjs/common';

import { Contact, ContactSelect } from './model';

import { ContactArgs, ContactCreateInput, ContactsArgs, ContactUpdateInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { BadRequestException } from '@nestjs/common/exceptions';



@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) { }

  public async findOne(
    { where }: ContactArgs,
    { select }: ContactSelect,
  ): Promise<Contact> {
    return this.prismaService.contact.findUnique({
      where: {
        contactUserId_userId: where
      },
      select,
    });
  }

  public async findMany(
    args: ContactsArgs,
    { select }: ContactSelect,
  ): Promise<Contact[]> {
    return this.prismaService.contact.findMany({
      ...args,
      select,
      cursor: {
        contactUserId_userId: args.cursor
      },
      where: {
        ...args.where
      }
    });
  }


  public async create(
    data: ContactCreateInput,
    { select }: ContactSelect,
  ): Promise<Contact> {

    const contactUser = await this.prismaService.user.findUnique({
      where: {
        phoneNumber: data.phoneNumber
      },
      select: {
        id: true
      }
    })

    if (!contactUser) {
      throw new BadRequestException("This phone number is not related to any user");
    }

    return this.prismaService.contact.create({
      data: {
        user: data.user,
        fullName: `${data.firstName} ${data.lastName}`,
        contactUser: {
          connect: {
            id: contactUser.id
          }
        }
      },
      select,
    });
  }

  public async update(
    { where }: ContactArgs,
    { select }: ContactSelect,
      data: ContactUpdateInput
  ):
   Promise<Contact>{
    return this.prismaService.contact.update({
      data: {
        fullName: `${data.firstName} ${data.lastName}`,
        isBlocked: data.isBlocked,
        isFavorite: data.isFavorite
      },
      select,
      where: {
        contactUserId_userId: where
      }
    })
  }

  public async delete(
    { where }: ContactArgs,
    { select }: ContactSelect,
  ):
   Promise<Contact>{
    return this.prismaService.contact.delete({
      select,
      where: {
        contactUserId_userId: where
      }
    })
  }
}