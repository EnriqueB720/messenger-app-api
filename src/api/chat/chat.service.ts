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
      const chatsId = await this.prismaService.contact.findMany({
        where: {
          fullName: { contains: name },
          userId
        },
        select: {
          user: {
            select: {
              chatParticipants: {
                select: {
                  chat: {
                    select: {
                      id: true,
                      isGroup: true
                    }
                  }
                }
              }
            }
          }
        }
      })

      console.log(...chatsId, userId);

      const chatIdsOfNonGroupChats = chatsId.map(c => {
        const nonGroupChatParticipant = c.user.chatParticipants.find(cp => {
          return cp.chat.isGroup === false;
        });
        if (nonGroupChatParticipant) {
          return nonGroupChatParticipant.chat.id;
        }
        return null;
      }).filter(id => id !== null);


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
            { AND: [{ isGroup: false }, { id: { in: chatIdsOfNonGroupChats } }, { participants:  { some: { userId: userId } } }] }
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