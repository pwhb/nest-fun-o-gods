
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission
{
    // name: z.string(),
    // description: z.string(),
    // menu: z.string(),
    // action: z.string(),
    // active: z.coerce.boolean(),
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