import { Injectable } from '@nestjs/common';

import { Chat, ChatSelect } from './model';

import { ChatArgs, ChatCreateInput, ChatsArgs } from './dto';

import { PrismaService } from '@prisma-datasource';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) { }

  public async findOne(
    { where }: ChatArgs,
    { select }: ChatSelect,
  ): Promise<Chat> {
    return this.prismaService.chat.findUnique({
      where,
      select,
    });
  }

  public async findMany(
    args: ChatsArgs,
    { select }: ChatSelect,
  ): Promise<Chat[]> {
    return this.prismaService.chat.findMany({
      ...args,
      select,
      where: {
        ...args.where
      }
    });
  }

  public async create(
    data: ChatCreateInput,
    { select }: ChatSelect,
  ): Promise<Chat> {
    return this.prismaService.chat.create({
      data,
      select,
    });
  }
}