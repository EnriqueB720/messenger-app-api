import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";


@InputType()
export class ChatCreateInput {
    @MaxLength(100)
    @Field(() => String)
    name: string;
    
    @Field(() => Boolean, { nullable: true })
    isGroup: boolean;
}