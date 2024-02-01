import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { DRoles } from 'src/decorator/roles.decorator';
import { Dconnection } from 'src/decorator/connection.decorator';
import { DModel } from 'src/decorator/model.decorator';
import { Model } from 'mongoose';
import { Page } from 'src/schema/page.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pages')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @DRoles(['page.read', 'page.add'])
  @Dconnection(['Page'])
  async create(@Body() createPageDto: CreatePageDto, @DModel('Page') pageModel: Model<Page>) {
    return await this.pageService.create(createPageDto, pageModel);
  }

  @Get()
  @DRoles(['page.read'])
  @Dconnection(['Page'])
  async findAll(@DModel('Page') pageModel: Model<Page>) {
    return await this.pageService.findAll(pageModel);
  }

  @Get(':id')
  @DRoles(['page.read'])
  @Dconnection(['Page'])
  async findOne(@Param('id') id: string, @DModel('Page') pageModel: Model<Page>) {
    return await this.pageService.findOne(id, pageModel);
  }

  @Patch(':id')
  @DRoles(['page.read', 'page.update'])
  @Dconnection(['Page'])
  async update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto, @DModel('Page') pageModel: Model<Page>) {
    return await this.pageService.update(id, updatePageDto, pageModel);
  }

  @Delete(':id')
  @DRoles(['page.read', 'page.delete'])
  @Dconnection(['Page'])
  async remove(@Param('id') id: string, @DModel('Page') pageModel: Model<Page>) {
    return await this.pageService.remove(id, pageModel);
  }
}
