import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RootModule } from './root/root.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth/guard/role.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
      ({
        uri: config.get<string>('MONGODB_URI'),
        dbName: config.get<string>('DB_NAME'),
      })
    }),
    RootModule,
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    PermissionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
