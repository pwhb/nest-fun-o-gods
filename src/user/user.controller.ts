import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UserService } from './user.service';

import { Public, CurrentUser } from 'src/lib/decorators/auth';
import { KeyType, getOptions, getObjectIds, Key } from 'src/lib/utils/query';
import { User } from './user.schema';
import { Request } from 'express';



@ApiTags('User')
@ApiBearerAuth()
@Controller('api/v1/users')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController
{
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create user' })
    @Post("/")
    async create(@Body() user: User)
    {
        return {
            data: await this.userService.create(user)
        };
    }

    @ApiOperation({ summary: 'Find user by Id' })
    @Get("/:id")
    @ApiParam({ name: 'id', type: String })
    async findById(@Param('id') id: string)
    {
        const data = await this.userService.findById(id);
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


        const { query } = request;
        const keys: Key[] = [
            {
                key: "q",
                type: KeyType.Regex,
                searchedFields: ["username"]
            },
            {
                key: "active",
                type: KeyType.Boolean
            }
        ];

        const { page, limit, skip, filter, sort } = getOptions(query, keys);
        const data = await this.userService.find({ filter, skip, limit, sort });
        return {
            page,
            limit,
            data
        };
    }


    @ApiOperation({ summary: 'Update user' })
    @Patch("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndUpdate(@Param('id') id: string, @Body() user: User)
    {
        const data = await this.userService.findByIdAndUpdate(id, user);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }



    @ApiOperation({ summary: 'Delete user' })
    @Delete("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndDelete(@Param('id') id: string)
    {
        const data = await this.userService.findByIdAndDelete(id);
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
            data: await this.userService.deleteMany(ids)
        };
    }


}
