import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionModule } from 'src/permission/permission.module';
import { User, UserSchema } from 'src/user/user.schema';
import { Role, RoleSchema } from './role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema }
    ]),
    PermissionModule
  ],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule { }
