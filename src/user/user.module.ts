import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/role/role.schema';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
    PermissionModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule { }
