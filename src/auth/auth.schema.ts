import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type AuthDocument = mongoose.HydratedDocument<Auth>;

@Schema()
export class Auth
{
    @ApiProperty()
    @Prop({ required: true })
    username: string;

    @ApiProperty()
    @Prop({ required: true })
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);