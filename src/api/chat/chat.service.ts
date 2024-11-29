import { HttpException, Injectable } from '@nestjs/common';

import { Chat, ChatSelect } from './model';

import { ChatArgs, ChatCreateInput, ChatsArgs, ChatWhereInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { ContactWhereUniqueInput } from '../contact/dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) { }

  public async findUnique(
    { where }: ChatArgs,
    { select }: ChatSelect,
  ): Promise<Chat> {
    return this.prismaService.chat.findFirst({
      select,
      where
    });
  }

  public async findOne(
    where: ChatWhereInput,
    { select }: ChatSelect,
  ): Promise<Chat> {
    return this.prismaService.chat.findFirst({
      select,
      where
    });
  }

  public async findMany(
    {
      where: {
        userId,
        name,
        ...where
      },
      ...args
    }: ChatsArgs,
    { select }: ChatSelect,
  ): Promise<Chat[]> {

    if (name) {
      const contactsId = await this.prismaService.contact.findMany({
        where: {
          fullName: { contains: name },
          userId,
        },
        select: {
          contactUser:{
            select:{
              id: true
            }
          }
        }
      });

      let contactIds: number[] = [];
      
      contactsId.forEach(contact => {
       contactIds.push(contact.contactUser.id);
      })

      const chatsId = await this.prismaService.chat.findMany({
        where: {
          participants: {
            some: {
                userId: { in: contactIds},
            }
          },
          isGroup: false
        },
        select:{
          id: true
        }
      });

      const chatsIds: number[] = [];

      chatsId.forEach(chatId => {
        chatsIds.push(chatId.id);
      });

      return this.prismaService.chat.findMany({
        ...args,
        select: {
          ...select,
          messages: {
            take: 1,
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        where: {
          ...where,
          OR: [
            { AND: [{ name: { contains: name } }, { participants: { some: { userId: userId } } }] },
            { AND: [{ isGroup: false }, { id: { in: chatsIds } }, { participants:  { some: { userId: userId } } }] }
          ]
        }
      });
    }
    
    return this.prismaService.chat.findMany({
      ...args,
      select: {
        ...select,
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      where: {
        ...where,
        participants: {
          some: {
            userId
          }
        },
        AND: {
          messages: {
            some: {
              text: { not: '' }
            }
          }
        }
      }
    });
  }

  public async createDirectChat(
    data: ChatCreateInput,
    { select }: ChatSelect,
    participants: ContactWhereUniqueInput
  ): Promise<Chat> {
    return this.prismaService.chat.create({
      data: {
        name: data.name,
        isGroup: data.isGroup,
        participants: {
          create: [
            { userId: participants.userId },
            { userId: participants.contactUserId }]
        }
      },
      select,
    });
  }

  public async createGroupChat(
    data: ChatCreateInput,
    { select }: ChatSelect,
  ): Promise<Chat> {
    return this.prismaService.chat.create({
      data: {
        name: data.name,
        isGroup: true,
        participants: {
          createMany: {
            data: data.participantIds,
            skipDuplicates: true
          }
        }
      },
      select,
    });
  }
}