import { Field, InputType, Int } from "@nestjs/graphql";
import { ChatCreateNestedOneWithoutMessagesInput } from "src/api/chat/dto";
import { ContactWhereUniqueInput } from "src/api/contact/dto";
import { UserCreateNestedOneWithoutMessagesInput } from "src/api/user/dto";


@InputType()
export class GroupMessageCreateInput {
    @Field(() => String)
    text: string;

    @Field(() => ChatCreateNestedOneWithoutMessagesInput)
    chat: ChatCreateNestedOneWithoutMessagesInput;

    @Field(() => UserCreateNestedOneWithoutMessagesInput)
    sender: UserCreateNestedOneWithoutMessagesInput;
}

@InputType()
export class DirectMessageCreateInput {
    @Field(() => String)
    text: string;
    
    @Field(() => ContactWhereUniqueInput)
    contact: ContactWhereUniqueInput;

    @Field(() => UserCreateNestedOneWithoutMessagesInput)
    sender: UserCreateNestedOneWithoutMessagesInput;
}