import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true,
})
export class User{
    @Prop({
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    })
    email: String;

    @Prop({required: true})
    username: String;

    @Prop()
    password: String;

    @Prop({default: new Date()})
    createdAt: Date;    
}

export const UserSchema = SchemaFactory.createForClass(User);