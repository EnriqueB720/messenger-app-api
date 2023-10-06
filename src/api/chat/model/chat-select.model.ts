interface ChatPrismaSelect {
    id?: boolean;
    uuid?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isGroup?: boolean;
  }
  
  export interface ChatSelect {
    select?: ChatPrismaSelect;
  }
  