import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth } from "./auth.schema";
import { Public } from "src/lib/decorators/auth";
@ApiTags('Auth')
@Controller("api/v1/auth")
export class AuthController
{

    constructor(private readonly authService: AuthService)
    {
    }

    @ApiOperation({ summary: 'Register' })
    @Post("register")
    register(): { message: string; }
    {
        return this.authService.register();
    }

    @ApiOperation({ summary: 'Login' })
    @Post("login")
    @Public()
    login(@Body() payload: Auth) 
    {
        return this.authService.login(payload);
    }

    @Post("logout")
    logout()
    {
        return "logout";
    }
}