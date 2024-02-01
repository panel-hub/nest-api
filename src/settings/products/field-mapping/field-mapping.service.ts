import { Injectable } from '@nestjs/common';
import { CreateFieldMappingDto } from './dto/create-field-mapping.dto';
import { UpdateFieldMappingDto } from './dto/update-field-mapping.dto';
import { FieldMapping } from 'src/schema/field-mapping.schema';
import { Model } from 'mongoose';

@Injectable()
export class FieldMappingService {
  async create(createFieldMappingDto: CreateFieldMappingDto, SPFieldMappingModel: Model<FieldMapping>) {
    return await SPFieldMappingModel.create(createFieldMappingDto)
  }

  async findAll(SPFieldMappingModel: Model<FieldMapping>) {
    return await SPFieldMappingModel.find();
  }

  async findOne(id: string, SPFieldMappingModel: Model<FieldMapping>) {
    return await SPFieldMappingModel.findById(id);
  }

  async update(id: string, updateFieldMappingDto: UpdateFieldMappingDto, SPFieldMappingModel: Model<FieldMapping>) {
    return await SPFieldMappingModel.findByIdAndUpdate(id, { $set: updateFieldMappingDto });
  }

  async remove(id: string, SPFieldMappingModel: Model<FieldMapping>) {
    return await SPFieldMappingModel.findByIdAndDelete(id);
  }
}
