
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission
{
    _id: mongoose.Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    menu: string;

    @Prop()
    action: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);