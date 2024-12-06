import * as bcrypt from 'bcrypt';

import { Role } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { LoginOutput, LoginUserInput, SignUpInput } from './dto';

import { UserSelect } from 'src/api/user/model';

import { User } from 'src/api/user/model/user.model';

import { UserService } from 'src/api/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.findOne(
        {
          where: {
            email,
          },
        },
        {
          select: {
            id: true,
            uuid: true,
            email: true,
            type: true,
            username: true,
            fullName: true,
            phoneNumber: true,
            language: true,
            contacts: {
              select: {
                fullName: true,
                contactUserId: true
              }
            }
          },
        },
      );

      if (!user) {
        throw new Error('Email is incorrect');
      }

      const userPassword = await this.userService.findUserPassword({
        where: { email },
      });

      const valid = await bcrypt.compare(password, userPassword);

      if (!valid) {
        throw new Error('Invalid password');
      }

      return user && valid ? user : null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login({ email, password }: LoginUserInput) {

    const user = await this.validateUser(email, password);

    if (!user) return null;
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.uuid,
        role: user.type,
        expiresIn: '1h',
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      }),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      user,
    } as LoginOutput;
  }

  async signup(signUpInput: SignUpInput, select: UserSelect) {
    const userPassword = await this.userService.findUserPassword({
      where: {
        email: signUpInput.email,
      },
    });

    if (userPassword) {
      throw new Error('User already exists!');
    }

    const passwordHash = await bcrypt.hash(signUpInput.passwordHash, 10);

    return this.userService.create(
      {
        ...signUpInput,
        type: Role.USER,
        passwordHash,
      },
      {
        ...select,
      },
    );
  }

  async refreshUser(token: string) {

    let token_decoded = this.jwtService.decode(token);

    if (new Date() > new Date(token_decoded.expiresAt)) {
      return null;
    } else {

      let user = await this.userService.findOne({
        where: {
          email: token_decoded.email,
        }
      },
        {
          select: {
            id: true,
            uuid: true,
            email: true,
            type: true,
            username: true,
            fullName: true,
            phoneNumber: true,
            language: true,
            contacts: {
              select: {
                fullName: true,
                contactUserId: true
              }
            }
          },
        });

      return {
        access_token: this.jwtService.sign({
          email: user.email,
          sub: user.uuid,
          role: user.type,
          expiresIn: '1h',
          expiresAt: new Date(Date.now() + 60 * 60 * 1000)
        }),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        user,
      } as LoginOutput;
    }
  }
}