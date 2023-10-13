import { Injectable } from '@nestjs/common';

import { ChatParticipant, ChatParticipantSelect } from './model';

import { ChatParticipantArgs, ChatParticipantCreateInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { BadRequestException } from '@nestjs/common/exceptions';



@Injectable()
export class ChatParticipantService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findMany(
    { where }: ChatParticipantArgs,
    { select }: ChatParticipantSelect,
  ): Promise<ChatParticipant[]> {
    return this.prismaService.chatParticipant.findMany({
      where,
      select,
    });
  }

  public async createNewGroupParticipant(
    data: ChatParticipantCreateInput,
    { select }: ChatParticipantSelect,
  ): Promise<ChatParticipant> {

    let chat = await this.prismaService.chat.findUnique({
      select:{
        isGroup: true
      },
      where:{
        id: data.chat.connect.id
      }
    });

    let participant = await this.prismaService.chatParticipant.findFirst({
      select: {
        userId: true,
      },
      where: {
        chatId: data.chat.connect.id,
        userId: data.user.connect.id
      }
    });

    if(participant || !chat.isGroup){ //To validate if the user exists already or if the chat is not a group
      throw new BadRequestException("This user is not allow in the chat");
    }

    return this.prismaService.chatParticipant.create({
      data,
      select,
    });
  }
}
