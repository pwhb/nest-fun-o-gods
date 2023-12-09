export interface IFindParams
{
    filter: FilterQuery<any>;
    skip: number;
    limit: number;
    sort: Sort;
}