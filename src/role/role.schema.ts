
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role
{
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    permissions: string[];

    @Prop()
    menus: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);