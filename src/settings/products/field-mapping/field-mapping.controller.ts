import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldMappingService } from './field-mapping.service';
import { CreateFieldMappingDto } from './dto/create-field-mapping.dto';
import { UpdateFieldMappingDto } from './dto/update-field-mapping.dto';
import { DRoles } from 'src/decorator/roles.decorator';
import { Dconnection } from 'src/decorator/connection.decorator';
import { DModel } from 'src/decorator/model.decorator';
import { Model } from 'mongoose';
import { FieldMapping } from 'src/schema/field-mapping.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Settings => Products => Field Mapping')
@Controller('setting/product/field-mapping')
export class FieldMappingController {
  constructor(private readonly fieldMappingService: FieldMappingService) {}

  @Post()
  @DRoles(['setting:product:field-mapping.read', 'setting:product:field-mapping.add'])
  @Dconnection(['SPFieldMapping'])
  create(@Body() createFieldMappingDto: CreateFieldMappingDto, @DModel('SPFieldMapping') SPFieldMappingModel: Model<FieldMapping>) {
    return this.fieldMappingService.create(createFieldMappingDto, SPFieldMappingModel);
  }

  @Get()
  @DRoles(['setting:product:field-mapping.read'])
  @Dconnection(['SPFieldMapping'])
  findAll(@DModel('SPFieldMapping') SPFieldMappingModel: Model<FieldMapping>) {
    return this.fieldMappingService.findAll(SPFieldMappingModel);
  }

  @Get(':id')
  @DRoles(['setting:product:field-mapping.read'])
  @Dconnection(['SPFieldMapping'])
  findOne(@Param('id') id: string, @DModel('SPFieldMapping') SPFieldMappingModel: Model<FieldMapping>) {
    return this.fieldMappingService.findOne(id, SPFieldMappingModel);
  }

  @Patch(':id')
  @DRoles(['setting:product:field-mapping.read', 'setting:product:field-mapping.update'])
  @Dconnection(['SPFieldMapping'])
  update(@Param('id') id: string, @Body() updateFieldMappingDto: UpdateFieldMappingDto, @DModel('SPFieldMapping') SPFieldMappingModel: Model<FieldMapping>) {
    return this.fieldMappingService.update(id, updateFieldMappingDto, SPFieldMappingModel);
  }

  @Delete(':id')
  @DRoles(['setting:product:field-mapping.read', 'setting:product:field-mapping.delete'])
  @Dconnection(['SPFieldMapping'])
  remove(@Param('id') id: string, @DModel('SPFieldMapping') SPFieldMappingModel: Model<FieldMapping>) {
    return this.fieldMappingService.remove(id, SPFieldMappingModel);
  }
}
