interface UserMessageStatusPrismaSelect {
  messageId?: boolean;
  userId?: boolean;
  isRead?: boolean;
  isReceived?: boolean;
  isFavorite?: boolean;
}

export interface UserMessageStatusSelect {
  select?: UserMessageStatusPrismaSelect;
}
