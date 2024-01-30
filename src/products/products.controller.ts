import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DRoles } from 'src/decorator/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @DRoles(['products.read', 'products.add'])
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @DRoles(['products.read'])
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @DRoles(['products.read'])
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @DRoles(['products.read', 'products.update'])
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @DRoles(['products.read', 'products.delete'])
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
