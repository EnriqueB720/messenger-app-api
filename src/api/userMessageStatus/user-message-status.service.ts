import { Injectable } from '@nestjs/common';

import { UserMessageStatus, UserMessageStatusSelect } from './model';

import { UserMessageStatusArgs } from './dto';

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

}
