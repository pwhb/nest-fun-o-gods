import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { PermissionModule } from "src/permission/permission.module";


@Module({
    imports: [
        UserModule,
        PermissionModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                // secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }