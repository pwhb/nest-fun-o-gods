import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Request } from 'express';
import { Key, KeyType, getObjectIds, getOptions } from 'src/lib/utils/query';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Menu } from './menu.schema';

import { CurrentUser, Public } from 'src/lib/decorators/auth';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';

@ApiTags('Menu')
@ApiBearerAuth()
@Controller('api/v1/menus')
@UseGuards(JwtAuthGuard, RoleGuard)
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

    @ApiOperation({ summary: 'Get Menu Tree' })
    @Get("/asTree")
    async getMenuTree()
    {
        const data = await this.menuService.find({ filter: {}, skip: 0, limit: 500, sort: { name: 1 } });
        return data;
    }

    @ApiOperation({ summary: 'Find menu by Id' })
    @Get("/:id")
    @ApiParam({ name: 'id', type: String })
    async findById(@Param('id') id: string)
    {
        const data = await this.menuService.findById(id);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }

    @ApiOperation({ summary: 'Find menus' })
    @Public()
    @Get("/")
    @ApiQuery({ name: 'q', type: String, required: false })
    @ApiQuery({ name: 'active', type: Boolean, required: false })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'sort_by', type: String, required: false })
    async find(@Req() request: Request, @CurrentUser() user)
    {
        console.log({
            user: request.user
        });

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

        const { page, limit, skip, filter, sort } = getOptions(query, keys);
        return {
            page,
            limit,
            count: await this.menuService.count(filter),
            data: await this.menuService.find({ filter, skip, limit, sort })
        };
    }


    @ApiOperation({ summary: 'Update menu' })
    @Patch("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndUpdate(@Param('id') id: string, @Body() menu: Menu)
    {
        const data = await this.menuService.findByIdAndUpdate(id, menu);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }



    @ApiOperation({ summary: 'Delete menu' })
    @Delete("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndDelete(@Param('id') id: string)
    {
        const data = await this.menuService.findByIdAndDelete(id);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
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
