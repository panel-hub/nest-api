import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { DRoles } from 'src/decorator/roles.decorator';
import { Dconnection } from 'src/decorator/connection.decorator';
import { DModel } from 'src/decorator/model.decorator';
import { Model } from 'mongoose';
import { Theme } from 'src/schema/theme.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Theme')
@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  @DRoles(['theme.read', 'theme.add'])
  @Dconnection(['Theme'])
  async create(@Body() createThemeDto: CreateThemeDto, @DModel('Theme') themeModel: Model<Theme>) {
    return await this.themeService.create(createThemeDto, themeModel);
  }

  @Get()
  @DRoles(['theme.read'])
  @Dconnection(['Theme'])
  async findAll(@DModel('Theme') themeModel: Model<Theme>) {
    return await this.themeService.findAll(themeModel);
  }

  @Get(':id')
  @DRoles(['theme.read'])
  @Dconnection(['Theme'])
  async findOne(@Param('id') id: string, @DModel('Theme') themeModel: Model<Theme>) {
    return await this.themeService.findOne(id, themeModel);
  }

  @Patch(':id')
  @DRoles(['theme.read', 'theme.update'])
  @Dconnection(['Theme'])
  async update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto, @DModel('Theme') themeModel: Model<Theme>) {
    return await this.themeService.update(id, updateThemeDto, themeModel);
  }

  @Delete(':id')
  @DRoles(['theme.read', 'theme.delete'])
  @Dconnection(['Theme'])
  async remove(@Param('id') id: string, @DModel('Theme') themeModel: Model<Theme>) {
    return await this.themeService.remove(id, themeModel);
  }
}
