import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type MenuDocument = mongoose.HydratedDocument<Menu>;

@Schema()
export class Menu
{
    @ApiProperty()
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @Prop()
    description: string;

    @ApiProperty()
    @Prop()
    icon: string;

    @ApiProperty()
    @Prop()
    route: string;

    @ApiProperty()
    @Prop({ ref: Menu.name, type: mongoose.Schema.Types.ObjectId })
    parent: Menu;

    @ApiProperty()
    @Prop({ required: true, default: false })
    active: boolean;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    history: any;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);