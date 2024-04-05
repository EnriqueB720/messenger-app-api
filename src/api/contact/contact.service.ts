import { Injectable } from '@nestjs/common';

import { Contact, ContactSelect } from './model';

import { ContactArgs, ContactCreateInput, ContactsArgs, ContactUpdateInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UserService } from '../user/user.service';
import { ChatService } from '../chat/chat.service';




@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly chatService: ChatService) { }

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

    const contactUser = await this.userService.findOne({
      where: {
        phoneNumber: data.phoneNumber
      }
    }, {
      select: {
        id: true
      }
    });

    if (!contactUser) {
      throw new BadRequestException("This phone number is not related to any user");
    }

    const doesChatAlreadyExists = await this.chatService.findOne({
      AND: [
        { isGroup: false },
        { participants: { some: { userId: data.user.connect.id } } },
        { participants: { some: { userId: contactUser.id } } },
      ]
    }, {
      select: {
        id: true
      }
    });

    if (!doesChatAlreadyExists) {
      const newChat = await this.chatService.createDirectChat({
        isGroup: false,
        name: `${data.user.connect.id}/${contactUser.id}-single-chat`
      }, {
        select: {
          id: true
        }
      },
        {
          contactUserId: contactUser.id,
          userId: data.user.connect.id
        });

      if (!newChat) {
        throw new BadRequestException("Contact couldn't get created");
      }
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
    Promise<Contact> {
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
    Promise<Contact> {
    return this.prismaService.contact.delete({
      select,
      where: {
        contactUserId_userId: where
      }
    })
  }
}