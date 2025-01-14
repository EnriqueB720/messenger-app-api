import { Injectable } from '@nestjs/common';

import { UserMessageStatus, UserMessageStatusSelect } from './model';

import { UpdateUserMessageStatus, UserMessageStatusArgs } from './dto';

import { PrismaService } from '@prisma-datasource';

@Injectable()
export class UserMessageStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findMany(
    { where }: UserMessageStatusArgs,
    { select }: UserMessageStatusSelect,
  ): Promise<UserMessageStatus[]> {
    return this.prismaService.userMessageStatus.findMany({
      where,
      select,
    });
  }

  public async update(
     data: UpdateUserMessageStatus,
     { select }: UserMessageStatusSelect,
  ) : Promise<UserMessageStatus>{

    return this.prismaService.userMessageStatus.update({
      where : { 
        userId_messageId: {
          messageId: data.messageId,
          userId: data.userId
        }
      },
      data: {
        isRead: data.isRead,
        isReceived: data.isReceived,
        isFavorite: data.isFavorite
      },
      select
    })
  }

}
