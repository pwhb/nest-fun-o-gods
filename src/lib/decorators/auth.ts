import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';


export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) =>
    {
        const request: Request = ctx.switchToHttp().getRequest();
        if (data)
        {
            return request.user[data];
        }
        return request.user;
    },
);


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);