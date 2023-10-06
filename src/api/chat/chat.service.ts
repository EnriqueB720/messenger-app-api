import { Injectable } from '@nestjs/common';

import { Chat, ChatSelect } from './model';

import { ChatArgs, ChatCreateInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { BadRequestException } from '@nestjs/common/exceptions';



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