import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import { DRoles } from 'src/decorator/roles.decorator';
import { Dconnection } from 'src/decorator/connection.decorator';
import { DModel } from 'src/decorator/model.decorator';
import { Model } from 'mongoose';
import { NavigationModule } from './navigation.module';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Post()
  @DRoles(['navigation.read', 'navigation.add'])
  @Dconnection(['Navigation'])
  create(@Body() createNavigationDto: CreateNavigationDto, @DModel('Navigation') navigationModel: Model<NavigationModule>) {
    return this.navigationService.create(createNavigationDto, navigationModel);
  }

  @Get()
  @DRoles(['navigation.read'])
  @Dconnection(['Navigation'])
  findAll(@DModel('Navigation') navigationModel: Model<NavigationModule>) {
    return this.navigationService.findAll(navigationModel);
  }

  @Get(':id')
  @DRoles(['navigation.read'])
  @Dconnection(['Navigation'])
  findOne(@Param('id') id: string, @DModel('Navigation') navigationModel: Model<NavigationModule>) {
    return this.navigationService.findOne(id, navigationModel);
  }

  @Patch(':id')
  @DRoles(['navigation.read', 'navigation.update'])
  @Dconnection(['Navigation'])
  update(@Param('id') id: string, @Body() updateNavigationDto: UpdateNavigationDto, @DModel('Navigation') navigationModel: Model<NavigationModule>) {
    return this.navigationService.update(id, updateNavigationDto, navigationModel);
  }

  @Delete(':id')
  @DRoles(['navigation.read', 'navigation.delete'])
  @Dconnection(['Navigation'])
  remove(@Param('id') id: string, @DModel('Navigation') navigationModel: Model<NavigationModule>) {
    return this.navigationService.remove(id, navigationModel);
  }
}
