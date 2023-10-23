import { BadRequestException, Injectable } from '@nestjs/common';

import { Message, MessageSelect } from './model';

import { DirectMessageCreateInput, GroupMessageCreateInput, MessageArgs, MessagesArgs } from './dto';

import { PrismaService } from '@prisma-datasource';
import { ChatService } from '../chat/chat.service';



@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService,
              private readonly chatService: ChatService) { }

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

    let chat = await this.chatService.findOne({ //Finds the chat to see if it already exists
        AND: [
          { isGroup: false },
          { participants: { some: { userId: contact.userId } } },
          { participants: { some: { userId: contact.contactUserId } } },
        ]
    },{
      select: {
        id: true
      }
    });

    if (!chat) {
      chat = await this.chatService.createDirectChat({
        isGroup: false,
        name: `${contact.userId}/${contact.contactUserId}-single-chat`
      },{
        select: {
          id: true
        }
      },
      contact);
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

  public async createGroupMessage(
    data: GroupMessageCreateInput,
    { select }: MessageSelect,
  ): Promise<Message> {

    let chat = await this.chatService.findOne({
      isGroup: true,
      userId: data.sender.connect.id,
      id: data.chat.connect.id
    },
    {
      select:{
        id: true
      }
    });


    if(!chat){
      throw new BadRequestException("You are not part of this chat");
    }

    return this.prismaService.message.create({
      data: {
        ...data,
        chat: data.chat,
        sender: data.sender
      },
      select,
    });
  }
}
