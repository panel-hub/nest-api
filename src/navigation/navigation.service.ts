import { Injectable } from '@nestjs/common';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import { Model } from 'mongoose';
import { Navigation } from 'src/schema/navigation.schema';

@Injectable()
export class NavigationService {
  async create(createNavigationDto: CreateNavigationDto, navigationModel: Model<Navigation>) {
    return await navigationModel.create(createNavigationDto);
  }

  async findAll(navigationModel: Model<Navigation>) {
    return await navigationModel.find();
  }

  async findOne(id: string, navigationModel: Model<Navigation>) {
    return await navigationModel.findById(id);
  }

  async update(id: string, updateNavigationDto: UpdateNavigationDto, navigationModel: Model<Navigation>) {
    return await navigationModel.findByIdAndUpdate(id, { $set: updateNavigationDto });
  }

  async remove(id: string, navigationModel: Model<Navigation>) {
    return await navigationModel.findByIdAndDelete(id);
  }
}
