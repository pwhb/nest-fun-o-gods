import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Menu } from 'src/menu/menu.schema';
import { Permission } from 'src/permission/permission.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role
{
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @Prop()
    description: string;

    @ApiProperty()
    @Prop({ ref: Menu.name, type: [mongoose.Schema.Types.ObjectId] })
    menus: Menu[];

    @ApiProperty()
    @Prop({ ref: Permission.name, type: [mongoose.Schema.Types.ObjectId] })
    permissions: Permission[];

}

export const RoleSchema = SchemaFactory.createForClass(Role);