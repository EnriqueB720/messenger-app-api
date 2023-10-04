import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { UserCreateNestedOneWithoutContactsInput } from "src/api/user/dto";


@InputType()
export class ContactCreateInput {
    @MaxLength(100)
    @Field(() => String)
    firstName: string;

    @MaxLength(100)
    @Field(() => String)
    lastName: string;

    @Field(() => Int)
    phoneNumber: number;

    @Field(() => UserCreateNestedOneWithoutContactsInput)
    user: UserCreateNestedOneWithoutContactsInput;
}