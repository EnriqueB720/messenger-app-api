import { Field, InputType, Int } from "@nestjs/graphql";
import { ChatCreateNestedOneWithoutMessagesInput } from "src/api/chat/dto";
import { UserCreateNestedOneWithoutMessagesInput } from "src/api/user/dto";


@InputType()
export class MessageCreateInput {
    @Field(() => String)
    text: string;

    @Field(() => ChatCreateNestedOneWithoutMessagesInput)
    chat: ChatCreateNestedOneWithoutMessagesInput;

    @Field(() => UserCreateNestedOneWithoutMessagesInput)
    sender: UserCreateNestedOneWithoutMessagesInput;
}