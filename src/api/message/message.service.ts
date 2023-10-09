import { Injectable } from '@nestjs/common';

import { Message, MessageSelect } from './model';

import { MessageArgs, MessageCreateInput, MessagesArgs } from './dto';

import { PrismaService } from '@prisma-datasource';



@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) { }

  public async findOne(
    { where }: MessageArgs,
    { select }: MessageSelect,
  ): Promise<Message> {
    return this.prismaService.message.findUnique({
      where,
      select,
    });
  }

  public async findMany(
    args: MessagesArgs,
    { select }: MessageSelect,
  ): Promise<Message[]> {
    return this.prismaService.message.findMany({
      ...args,
      select
    });
  }

  public async create(
    data: MessageCreateInput,
    { select }: MessageSelect,
  ): Promise<Message> {
    return this.prismaService.message.create({
      data,
      select,
    });
  }
}
