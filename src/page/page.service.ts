import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Model } from 'mongoose';
import { Page } from 'src/schema/page.schema';

@Injectable()
export class PageService {
  async create(createPageDto: CreatePageDto, pageModel: Model<Page>) {
    return await pageModel.create(createPageDto)
  }

  async findAll(pageModel: Model<Page>) {
    return await pageModel.find()
  }

  async findOne(id: string, pageModel: Model<Page>) {
    return await pageModel.findById(id)
  }

  async update(id: string, updatePageDto: UpdatePageDto, pageModel: Model<Page>) {
    return await pageModel.findByIdAndUpdate(id, { $set: updatePageDto })
  }

  async remove(id: string, pageModel: Model<Page>) {
    return await pageModel.findByIdAndDelete(id)
  }
}
