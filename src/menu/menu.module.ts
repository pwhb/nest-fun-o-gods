import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './menu.schema';
import { MenuController } from './menu.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule { }
