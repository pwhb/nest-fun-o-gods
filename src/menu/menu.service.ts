import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './menu.schema';
import { Document, FilterQuery, Model, ModifyResult, Types } from 'mongoose';
import { IFindParams } from 'src/lib/types/query';

@Injectable()
export class MenuService
{
    constructor(@InjectModel(Menu.name) private menuModel: Model<Menu>) { }

    async findById(id: string): Promise<Menu>
    {
        return this.menuModel.findById(id).exec();
    }

    find({ filter, skip, limit, sort }: IFindParams): Promise<Menu[]>
    {
        return this.menuModel.find(filter, {}, { skip: skip, limit: limit, sort: sort }).lean().exec();
    }

    count(filter: FilterQuery<any>): Promise<number>
    {
        return this.menuModel.countDocuments(filter);
    }

    async create(menu: Menu): Promise<Menu>
    {
        return this.menuModel.create({
            ...menu,
            "history.created": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        });
    }

    async findByIdAndUpdate(id: string, menu: Menu): Promise<Menu>
    {
        return this.menuModel.findByIdAndUpdate(id, {
            ...menu,
            "history.updated": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        }, { new: true }).exec();
    }

    async findByIdAndDelete(id: string): Promise<ModifyResult<Document<unknown, {}, Menu> & Menu & { _id: Types.ObjectId; }>>
    {
        return this.menuModel.findByIdAndDelete(id).exec();
    }

    async deleteMany(ids: Types.ObjectId[]): Promise<{}>
    {
        return this.menuModel.deleteMany({ _id: { $in: ids } }).exec();
    }
}
