import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { ChatCreateNestedOneWithoutParticipantsInput } from "src/api/chat/dto";
import { UserCreateNestedOneWithoutChatParticipantsInput } from "src/api/user/dto";


@InputType()
export class ChatParticipantCreateInput {
    @Field(() => ChatCreateNestedOneWithoutParticipantsInput)
    chat: ChatCreateNestedOneWithoutParticipantsInput;

    @Field(() => UserCreateNestedOneWithoutChatParticipantsInput)
    user: UserCreateNestedOneWithoutChatParticipantsInput;
}
