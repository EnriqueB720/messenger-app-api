interface MessagePrismaSelect {
    id?: boolean;
    uuid?: boolean;
    chatId?: boolean;
    senderId?: boolean;
    text?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    replyMessageId?: boolean;
  }
  
  export interface MessageSelect {
    select?: MessagePrismaSelect;
  }
  