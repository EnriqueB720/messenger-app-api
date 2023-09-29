import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { User, UserSelect } from './model';

import { UserArgs, UserCreateInput } from './dto';

import { PrismaService } from 'src/shared/datasource/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOne(
    { where }: UserArgs,
    { select }: UserSelect,
  ): Promise<User> {
    return this.prismaService.user.findUnique({
      where,
      select,
    });
  }

  public async findUserPassword({ where }: UserArgs) {
    const user = await this.prismaService.user.findUnique({
      where,
    });
    return user ? user.passwordHash : null;
  }

  public async create(
    data: UserCreateInput,
    { select }: UserSelect,
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...data,
        uuid: uuidv4()
      },
      select,
    });
  }
}
