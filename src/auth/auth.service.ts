import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Auth } from "./auth.schema";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { compare } from "bcrypt";

@Injectable({})
export class AuthService
{
    constructor(private jwtService: JwtService, private userService: UserService) { }

    register()
    {


        return { message: "Register" };
    }
    async login(payload: Auth)
    {
        const user = await this.userService.findByUsername(payload.username);

        if (!user)
        {
            throw new ForbiddenException("User not found");
        }

        if (!user.active)
        {
            throw new ForbiddenException("User not active");
        }

        if (!await compare(payload.password, user.password))
        {
            throw new ForbiddenException("Password not match");
        }

        return {
            data: {
                user,
                access_token: this.jwtService.sign({ _id: user._id }),
            },
        };
    }

    logout() { }
}