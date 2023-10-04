interface UserPrismaSelect {
  id?: boolean;
  uuid?: boolean;
  email?: boolean;
  type?: boolean;
  phoneNumber?: boolean;
  username?: boolean;
  fullName?: boolean;
}

export interface UserSelect {
  select?: UserPrismaSelect;
}
