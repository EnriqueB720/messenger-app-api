interface ChatParticipantPrismaSelect {
    chatId?: boolean;
    userId?: boolean;
  }
  
  export interface ChatParticipantSelect {
    select?: ChatParticipantPrismaSelect;
  }
  