import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, MenuModule, PermissionModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
