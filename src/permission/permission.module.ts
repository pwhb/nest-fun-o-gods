import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission, PermissionSchema } from './permission.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from './permission.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      // { name: Role.name, schema: RoleSchema }
    ]),
  ],
  providers: [PermissionService],
  exports: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule { }
