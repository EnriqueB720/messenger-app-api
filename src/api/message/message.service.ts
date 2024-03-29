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
        },
        userMessageStatuses:{
          create: {
            userId: contact.contactUserId
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

    const chat = await this.chatService.findOne({
      isGroup: true,
      participants:{
        some:{
          userId: data.sender.connect.id //TODO Removal needed when Auth ready 
        }
      },
      id: data.chat.connect.id
    },
    {
      select:{
        id: true,
        participants: {
          select: {
            userId: true
          }
        }
      }
    });


    if(!chat){
      throw new BadRequestException("You are not part of this chat");
    }

    const participantWithoutSender = chat.participants.filter(p => p.userId !== data.sender.connect.id);

    return this.prismaService.message.create({
      data: {
        ...data,
        chat: data.chat,
        sender: data.sender,
        userMessageStatuses:{
          create: participantWithoutSender.map(p => ({
            user: {
              connect: {
                id: p.userId
              }
            }
          })) //TODO Removal needed when Auth ready 
        }
      },
      select,
    });
  }
}
