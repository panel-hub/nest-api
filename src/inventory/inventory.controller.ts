import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { DRoles } from 'src/decorator/roles.decorator';
import { Dconnection } from 'src/decorator/connection.decorator';
import { DModel } from 'src/decorator/model.decorator';
import { Model } from 'mongoose';
import { Inventory } from 'src/schema/inventory.schema';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @DRoles(['inventory.read', 'inventory.add'])
  @Dconnection(['Inventory'])
  create(@Body() createInventoryDto: CreateInventoryDto, @DModel('Inventory') inventoryModel: Model<Inventory>) {
    return this.inventoryService.create(createInventoryDto, inventoryModel);
  }

  @Get()
  @DRoles(['inventory.read'])
  @Dconnection(['Inventory'])
  findAll(@DModel('Inventory') inventoryModel: Model<Inventory>) {
    return this.inventoryService.findAll(inventoryModel);
  }

  @Get(':id')
  @DRoles(['inventory.read'])
  @Dconnection(['Inventory'])
  findOne(@Param('id') id: string, @DModel('Inventory') inventoryModel: Model<Inventory>) {
    return this.inventoryService.findOne(id, inventoryModel);
  }

  @Patch(':id')
  @DRoles(['inventory.read', 'inventory.update'])
  @Dconnection(['Inventory'])
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto, @DModel('Inventory') inventoryModel: Model<Inventory>) {
    return this.inventoryService.update(id, updateInventoryDto, inventoryModel);
  }

  @Delete(':id')
  @DRoles(['inventory.read', 'inventory.delete'])
  @Dconnection(['Inventory'])
  remove(@Param('id') id: string, @DModel('Inventory') inventoryModel: Model<Inventory>) {
    return this.inventoryService.remove(id, inventoryModel);
  }
}
