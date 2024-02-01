import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Model } from 'mongoose';
import { Inventory } from 'src/schema/inventory.schema';

@Injectable()
export class InventoryService {
  async create(createInventoryDto: CreateInventoryDto, inventoryModel: Model<Inventory>) {
    return await inventoryModel.create(createInventoryDto)
  }

  async findAll(inventoryModel: Model<Inventory>) {
    return await inventoryModel.find()
  }

  async findOne(id: string, inventoryModel: Model<Inventory>) {
    return await inventoryModel.findById(id);
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto, inventoryModel: Model<Inventory>) {
    return await inventoryModel.findByIdAndUpdate(id, { $set: updateInventoryDto })
  }

  async remove(id: string, inventoryModel: Model<Inventory>) {
    return await inventoryModel.findByIdAndDelete(id)
  }
}
