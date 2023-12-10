
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/lib/decorators/auth';
import { getPermissionName } from 'src/lib/utils/request';
import { time } from 'src/lib/utils/time';
import { PermissionService } from 'src/permission/permission.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class RoleGuard implements CanActivate
{
    constructor(private reflector: Reflector, private permissionService: PermissionService) { }

    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
        {
            return true;
        }


        const request: Request = context.switchToHttp().getRequest();
        const { user, originalUrl, method } = request;
        const name = getPermissionName(originalUrl, method);


        const permission = await time(async () => await this.permissionService.findByName(name));
        const isAllowed = (user as User).role.permissions.includes(permission._id as any);

        return isAllowed;
    }
}