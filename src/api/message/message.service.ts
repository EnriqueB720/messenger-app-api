import { Injectable } from '@nestjs/common';

import { Message, MessageSelect } from './model';

import { DirectMessageCreateInput, MessageArgs, MessagesArgs } from './dto';

import { PrismaService } from '@prisma-datasource';



@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) { }

  public async findOne(
    { where }: MessageArgs,
    { select }: MessageSelect,
  ): Promise<Message> {
    return this.prismaService.message.findUnique({
      where: {
        id: where.id
      },
      select,
    });
  }

  public async findMany(
    args: MessagesArgs,
    { select }: MessageSelect,
  ): Promise<Message[]> {
    return this.prismaService.message.findMany({
      ...args,
      select,
      where: {
        ...args.where
      }
    });
  }

  public async createDirectMessage(
    { contact, ...data }: DirectMessageCreateInput,
    { select }: MessageSelect,
  ): Promise<Message> {

    let chat = await this.prismaService.chat.findFirst({
      select: {
        id: true
      },
      where: {
        AND: [
          { isGroup: false },
          { participants: { some: { userId: contact.userId } } },
          { participants: { some: { userId: contact.contactUserId } } },
        ]
      }
    });

    if(!chat){
      chat = await this.prismaService.chat.create({
        data: {
          participants: { //Auto uses the chat id of the chat we are creating
            create: [{userId: contact.userId},
                     {userId: contact.contactUserId}]
          },
          name: `${contact.userId}/${contact.contactUserId}-single-chat`
        },
        select: {
          id: true
        }
      })
    }

    return this.prismaService.message.create({
      data: {
        ...data,
        chat: {
          connect: {
            id: chat.id
          }
        }
      },
      select,
    });
  }
}
