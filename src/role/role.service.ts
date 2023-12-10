import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Document, FilterQuery, Model, ModifyResult, Types } from 'mongoose';
import { IFindParams } from 'src/lib/types/query';

@Injectable()
export class RoleService
{
    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { }

    async findById(id: string): Promise<Role>
    {
        return this.roleModel.findById(id).exec();
    }

    find({ filter, skip, limit, sort }: IFindParams): Promise<Role[]>
    {
        return this.roleModel.find(filter, {}, { skip: skip, limit: limit, sort: sort }).exec();
    }

    count(filter: FilterQuery<any>): Promise<number>
    {
        return this.roleModel.countDocuments(filter);
    }


    async create(role: Role): Promise<Role>
    {
        return this.roleModel.create({
            ...role,
            "history.created": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        });
    }

    async findByIdAndUpdate(id: string, role: Role): Promise<Role>
    {
        return this.roleModel.findByIdAndUpdate(id, {
            ...role,
            "history.updated": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        }, { new: true }).exec();
    }

    async findByIdAndDelete(id: string): Promise<ModifyResult<Document<unknown, {}, Role> & Role & { _id: Types.ObjectId; }>>
    {
        return this.roleModel.findByIdAndDelete(id).exec();
    }

    async deleteMany(ids: Types.ObjectId[]): Promise<{}>
    {
        return this.roleModel.deleteMany({ _id: { $in: ids } }).exec();
    }
}
