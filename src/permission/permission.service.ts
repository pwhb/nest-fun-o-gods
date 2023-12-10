import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model, ModifyResult, Types } from 'mongoose';
import { Permission } from './permission.schema';
import { IFindParams } from 'src/lib/types/query';

@Injectable()
export class PermissionService
{

    constructor(@InjectModel(Permission.name) private permissionModel: Model<Permission>) { }


    async findById(id: string): Promise<Permission>
    {
        return this.permissionModel.findById(id).exec();
    }

    async findByName(name: string): Promise<Permission>
    {
        return this.permissionModel.findOne({ name }).select({ _id: 1 }).exec();
    }

    find({ filter, skip, limit, sort }: IFindParams): Promise<Permission[]>
    {
        return this.permissionModel.find(filter, {}, { skip: skip, limit: limit, sort: sort }).exec();
    }

    count(filter: FilterQuery<any>): Promise<number>
    {
        return this.permissionModel.countDocuments(filter);
    }

    async create(role: Permission): Promise<Permission>
    {
        return this.permissionModel.create({
            ...role,
            "history.created": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        });
    }

    async findByIdAndUpdate(id: string, role: Permission): Promise<Permission>
    {
        return this.permissionModel.findByIdAndUpdate(id, {
            ...role,
            "history.updated": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        }, { new: true }).exec();
    }

    async findByIdAndDelete(id: string): Promise<ModifyResult<Document<unknown, {}, Permission> & Permission & { _id: Types.ObjectId; }>>
    {
        return this.permissionModel.findByIdAndDelete(id).exec();
    }

    async deleteMany(ids: Types.ObjectId[]): Promise<{}>
    {
        return this.permissionModel.deleteMany({ _id: { $in: ids } }).exec();
    }
}
