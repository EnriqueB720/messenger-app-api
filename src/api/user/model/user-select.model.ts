import { ContactSelect } from "src/api/contact/model";

interface UserPrismaSelect {
  id?: boolean;
  uuid?: boolean;
  email?: boolean;
  type?: boolean;
  phoneNumber?: boolean;
  username?: boolean;
  fullName?: boolean;
  language?: boolean;
  contacts?: ContactSelect;
}

export interface UserSelect {
  select?: UserPrismaSelect;
}
