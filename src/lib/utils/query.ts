
import { FilterQuery, Types } from "mongoose";
import { ParsedQs } from "qs";
import { DEFAULT_LIMIT } from "../consts/value";


export enum KeyType
{
    String,
    Boolean,
    ObjectId,
    DateBefore,
    DateAfter,
    Regex,
    Any
}

export interface Key
{
    type: KeyType;
    key: string;
    field?: string;
    searchedFields?: string[];
}

export function getObjectIds(query: { ids: string; })
{
    const ids = query.ids.split(",");
    return ids.map(id => new Types.ObjectId(id.trim()));
}

export function getOptions(query: ParsedQs, keys: Key[] = [])
{
    const page = query.page ? parseInt(query.page as string) : 0;
    const limit = query.limit ? parseInt(query.limit as string) : DEFAULT_LIMIT;
    const skip = page * limit;

    const filter = getFilter(keys, query);
    const sort = getSort(query.sort_by as string);

    return { page, limit, skip, filter, sort };
}


export function getFilter(keys: Key[], query: ParsedQs)
{
    const or: FilterQuery<any>[] = [];
    const and: FilterQuery<any>[] = [];

    const filter: FilterQuery<any> = {};

    for (let key of keys)
    {
        if (query[key.key])
        {


            switch (key.type)
            {
                case KeyType.String: {
                    filter[key.field ? key.field : key.key] = query[key.key];
                    break;
                }
                case KeyType.Boolean: {
                    filter[key.field ? key.field : key.key] = query[key.key] === "true";
                    break;
                }
                case KeyType.ObjectId: {
                    filter[key.field ? key.field : key.key] = new Types.ObjectId(query[key.key] as string);
                    break;
                }
                case KeyType.DateAfter: {
                    and.push({
                        [key.field ? key.field : key.key]: { $gte: new Date(query[key.key] as string) }
                    });
                    break;
                }
                case KeyType.DateBefore: {
                    and.push({
                        [key.field ? key.field : key.key]: { $lt: new Date(query[key.key] as string) }
                    });
                    break;
                } case KeyType.Regex: {
                    if (key.searchedFields)
                    {
                        for (let searchedKey of key.searchedFields)
                        {
                            or.push({
                                [searchedKey]: { $regex: query[key.key], $options: "i" }
                            });
                        }
                    }
                    break;
                }
            }
        }
    }

    if (and.length && or.length)
    {
        filter["$and"] = [...and, { "$or": or }];
    } else if (or.length)
    {
        filter["$or"] = or;
    } else if (and.length)
    {
        filter["$and"] = and;
    }

    return filter;

}

export function getSort(sort_by?: any)
{
    const sort: any = {};
    if (sort_by)
    {
        const split = sort_by.split(",");
        for (let key of split)
        {
            const trimmed = key.trim();
            const field = trimmed.replace("-", "");
            sort[field] = trimmed[0] === "-" ? -1 : 1;
        }
    } else
    {
        sort["history.created.at"] = -1;
    }
    return sort;
}