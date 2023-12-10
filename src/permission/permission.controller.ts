import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public, CurrentUser } from 'src/lib/decorators/auth';
import { KeyType, getOptions, getObjectIds, Key } from 'src/lib/utils/query';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionService } from './permission.service';
import { Permission } from './permission.schema';
import { RoleGuard } from 'src/auth/guard/role.guard';


@ApiTags('Permission')
@ApiBearerAuth()
@Controller('api/v1/permissions')
@UseGuards(JwtAuthGuard, RoleGuard)
export class PermissionController
{

    constructor(private readonly permissionService: PermissionService) { }

    @ApiOperation({ summary: 'Create permission' })
    @Post("/")
    async create(@Body() permission: Permission)
    {
        return {
            data: await this.permissionService.create(permission)
        };
    }

    @ApiOperation({ summary: 'Find permission by Id' })
    @Get("/:id")
    @ApiParam({ name: 'id', type: String })
    async findById(@Param('id') id: string)
    {
        const data = await this.permissionService.findById(id);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }

    @ApiOperation({ summary: 'Find permissions' })
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
            count: await this.permissionService.count(filter),
            data: await this.permissionService.find({ filter, skip, limit, sort })
        };
    }


    @ApiOperation({ summary: 'Update permission' })
    @Patch("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndUpdate(@Param('id') id: string, @Body() permission: Permission)
    {
        const data = await this.permissionService.findByIdAndUpdate(id, permission);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }



    @ApiOperation({ summary: 'Delete permission' })
    @Delete("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndDelete(@Param('id') id: string)
    {
        const data = await this.permissionService.findByIdAndDelete(id);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }

    @ApiOperation({ summary: 'Delete permissions' })
    @Delete("/")
    @ApiQuery({ name: 'ids', type: String })
    async deleteMany(@Query() query: { ids: string; })
    {
        const ids = getObjectIds(query);
        return {
            data: await this.permissionService.deleteMany(ids)
        };
    }
}
