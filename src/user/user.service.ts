import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model, ModifyResult, Types } from 'mongoose';
import { User } from './user.schema';
import { IFindParams } from 'src/lib/types/query';

@Injectable()
export class UserService
{

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findById(id: string): Promise<User>
    {
        return this.userModel.findById(id).populate({
            path: "role", select: {
                name: 1,
                permissions: 1
            }
        }).select({
            password: 0,
            history: 0
        }).exec();
    }
    findByUsername(username: string): Promise<User>
    {
        return this.userModel.findOne({ username }).populate({
            path: "role", select: {
                name: 1,
            }
        }).exec();
    }



    find({ filter, skip, limit, sort }: IFindParams): Promise<User[]>
    {
        return this.userModel.find(filter, {}, { skip: skip, limit: limit, sort: sort }).populate({
            path: "role", select: {
                name: 1,
            }
        }).select({
            password: 0,
            history: 0
        }).exec();
    }

    count(filter: FilterQuery<any>): Promise<number>
    {
        return this.userModel.countDocuments(filter);
    }

    async create(user: User): Promise<User>
    {
        return this.userModel.create({
            ...user,
            "history.created": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        });
    }

    async findByIdAndUpdate(id: string, user: User): Promise<User>
    {
        return this.userModel.findByIdAndUpdate(id, {
            ...user,
            "history.updated": {
                // by: authenticatedUser._id,
                at: new Date()
            },
        }, { new: true }).exec();
    }

    async findByIdAndDelete(id: string): Promise<ModifyResult<Document<unknown, {}, User> & User & { _id: Types.ObjectId; }>>
    {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async deleteMany(ids: Types.ObjectId[]): Promise<{}>
    {
        return this.userModel.deleteMany({ _id: { $in: ids } }).exec();
    }
}
