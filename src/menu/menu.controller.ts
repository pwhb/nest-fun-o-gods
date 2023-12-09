import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Request } from 'express';
import { Key, KeyType, getFilter, getObjectIds, getSort } from 'src/lib/utils/query';
import { DEFAULT_LIMIT } from 'src/lib/consts/value';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Menu } from './menu.schema';

@ApiTags('Menu')
@Controller('api/v1/menus')
export class MenuController
{
    constructor(private readonly menuService: MenuService) { }

    @ApiOperation({ summary: 'Create menu' })
    @Post("/")
    async create(@Body() menu: Menu)
    {
        return {
            data: await this.menuService.create(menu)
        };
    }

    @ApiOperation({ summary: 'Find menu by Id' })
    @Get("/:id")
    @ApiParam({ name: 'id', type: String })
    async findById(@Param('id') id: string)
    {
        return {
            data: await this.menuService.findById(id)
        };
    }

    @ApiOperation({ summary: 'Find menus' })
    @Get("/")
    @ApiQuery({ name: 'q', type: String, required: false })
    @ApiQuery({ name: 'active', type: Boolean, required: false })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'sort_by', type: String, required: false })
    async find(@Req() request: Request)
    {
        const { query } = request;
        const keys: Key[] = [
            {
                key: "q",
                type: KeyType.Regex,
                searchedFields: ["name"]
            },
            {
                key: "active",
                type: KeyType.Boolean
            }
        ];

        const page = query.page ? parseInt(query.page as string) : 0;
        const limit = query.limit ? parseInt(query.limit as string) : DEFAULT_LIMIT;
        const skip = page * limit;

        const filter = getFilter(keys, query);
        const sort = getSort(query.sort_by as string);
        return {
            page,
            limit,
            ... await this.menuService.find({ filter, skip, limit, sort })
        };
    }


    @ApiOperation({ summary: 'Update menu' })
    @Patch("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndUpdate(@Param('id') id: string, @Body() menu: Menu)
    {
        // const { body } = request;
        return {
            data: await this.menuService.findByIdAndUpdate(id, menu)
        };
    }



    @ApiOperation({ summary: 'Delete menu' })
    @Delete("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndDelete(@Param('id') id: string)
    {
        return {
            data: await this.menuService.findByIdAndDelete(id)
        };
    }

    @ApiOperation({ summary: 'Delete menus' })
    @Delete("/")
    @ApiQuery({ name: 'ids', type: String })
    async deleteMany(@Query() query: { ids: string; })
    {
        const ids = getObjectIds(query);
        return {
            data: await this.menuService.deleteMany(ids)
        };
    }


}
