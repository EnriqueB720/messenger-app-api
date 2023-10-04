interface ContactPrismaSelect {
    userId?: boolean;
    contactUserId?: boolean;
    fullName?: boolean;
    isFavorite?: boolean;
    isBlocked?: boolean;
  }
  
  export interface ContactSelect {
    select?: ContactPrismaSelect;
  }
  