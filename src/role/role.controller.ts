import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public, CurrentUser } from 'src/lib/decorators/auth';
import { KeyType, getOptions, getObjectIds, Key } from 'src/lib/utils/query';
import { RoleService } from './role.service';
import { Role } from './role.schema';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';


@ApiTags('Role')
@Controller('api/v1/roles')
@UseGuards(JwtAuthGuard, RoleGuard)
export class RoleController
{

    constructor(private readonly roleService: RoleService) { }

    @ApiOperation({ summary: 'Create role' })
    @Post("/")
    async create(@Body() role: Role)
    {
        return {
            data: await this.roleService.create(role)
        };
    }

    @ApiOperation({ summary: 'Find role by Id' })
    @Get("/:id")
    @ApiParam({ name: 'id', type: String })
    async findById(@Param('id') id: string)
    {
        const data = await this.roleService.findById(id);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }

    @ApiOperation({ summary: 'Find roles' })
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
        const data = await this.roleService.find({ filter, skip, limit, sort });
        return {
            page,
            limit,
            data
        };
    }


    @ApiOperation({ summary: 'Update role' })
    @Patch("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndUpdate(@Param('id') id: string, @Body() role: Role)
    {
        const data = await this.roleService.findByIdAndUpdate(id, role);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }



    @ApiOperation({ summary: 'Delete role' })
    @Delete("/:id")
    @ApiParam({ name: 'id', type: String })
    async findByIdAndDelete(@Param('id') id: string)
    {
        const data = await this.roleService.findByIdAndDelete(id);
        if (!data)
        {
            throw new NotFoundException();
        }
        return {
            data
        };
    }

    @ApiOperation({ summary: 'Delete roles' })
    @Delete("/")
    @ApiQuery({ name: 'ids', type: String })
    async deleteMany(@Query() query: { ids: string; })
    {
        const ids = getObjectIds(query);
        return {
            data: await this.roleService.deleteMany(ids)
        };
    }
}
