import { Role } from '@prisma/client';

export interface IAuthUser {
  sub: string;
  email: string;
  role: Role;
}