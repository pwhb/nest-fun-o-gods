import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService
{
    register()
    {
        return { message: "Register" };
    }
    login()
    {
        return { message: "Login" };
    }

    logout() { }
}