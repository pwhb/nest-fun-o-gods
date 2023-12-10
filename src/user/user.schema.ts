import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Menu } from 'src/menu/menu.schema';
import { Permission } from 'src/permission/permission.schema';
import { Role } from 'src/role/role.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User
{
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    @Prop({ required: true })
    username: string;

    @ApiProperty()
    @Prop({ required: true })
    password: string;

    @ApiProperty()
    @Prop({ ref: Role.name, type: mongoose.Schema.Types.ObjectId })
    role: Role;
    
    @ApiProperty()
    @Prop({ required: true, default: false })
    active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);