import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Model } from 'mongoose';
import { Theme } from 'src/schema/theme.schema';

@Injectable()
export class ThemeService {
  async create(createThemeDto: CreateThemeDto, themeModel: Model<Theme>) {
    return await themeModel.create(createThemeDto);
  }

  async findAll(themeModel: Model<Theme>) {
    return await themeModel.find();
  }

  async findOne(id: string, themeModel: Model<Theme>) {
    return await themeModel.findById(id);
  }

  async update(id: string, updateThemeDto: UpdateThemeDto, themeModel: Model<Theme>) {
    return await themeModel.findByIdAndUpdate(id, { $set: updateThemeDto });
  }

  async remove(id: string, themeModel: Model<Theme>) {
    return await themeModel.findByIdAndDelete(id);
  }
}
