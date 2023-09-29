interface UserPrismaSelect {
  id?: boolean;
  uuid?: boolean;
  email?: boolean;
  type?: boolean;
  username?: boolean;
  fullName?: boolean;
}

export interface UserSelect {
  select?: UserPrismaSelect;
}
