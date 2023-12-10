import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './menu.schema';
import { MenuController } from './menu.controller';
import { PermissionService } from 'src/permission/permission.service';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    PermissionModule
  ],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule { }
