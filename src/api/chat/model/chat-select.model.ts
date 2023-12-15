import { ChatParticipantSelect } from "src/api/chat-participant/model";

interface ChatPrismaSelect {
    id?: boolean;
    uuid?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isGroup?: boolean;
    participants?: ChatParticipantSelect;
  }
  
  export interface ChatSelect {
    select?: ChatPrismaSelect;
  }
  