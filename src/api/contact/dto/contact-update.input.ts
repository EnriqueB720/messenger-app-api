import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { ContactArgs } from "./contact.args";


@InputType()
export class ContactUpdateInput {
    
    @Field(() => Int)
    userId: number;

    @Field(() => Int)
    contactUserId: number;
    
    @MaxLength(100)
    @Field(() => String)
    firstName: string;

    @MaxLength(100)
    @Field(() => String)
    lastName: string;

    @Field(() => Boolean)
    isFavorite: boolean;
    
    @Field(() => Boolean)
    isBlocked: boolean;
}