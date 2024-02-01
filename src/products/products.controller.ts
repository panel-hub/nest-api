import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DRoles } from 'src/decorator/roles.decorator';
import { Dconnection } from 'src/decorator/connection.decorator';
import { DModel } from 'src/decorator/model.decorator';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @DRoles(['products.read', 'products.add'])
  @Dconnection(['Products'])
  create(
    @Body() createProductDto: CreateProductDto,
    @DModel('Products') productModel: Model<Product>,
  ) {
    return this.productsService.create(createProductDto, productModel);
  }

  @Get()
  @DRoles(['products.read'])
  @Dconnection(['Products'])
  findAll(@DModel('Products') productModel: Model<Product>) {
    return this.productsService.findAll(productModel);
  }

  @Get(':id')
  @DRoles(['products.read'])
  @Dconnection(['Products'])
  findOne(
    @Param('id') id: string,
    @DModel('Products') productModel: Model<Product>,
  ) {
    return this.productsService.findOne(id, productModel);
  }

  @Patch(':id')
  @DRoles(['products.read', 'products.update'])
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @DModel('Products') productModel: Model<Product>,
  ) {
    return this.productsService.update(id, updateProductDto, productModel);
  }

  @Delete(':id')
  @DRoles(['products.read', 'products.delete'])
  @Dconnection(['Products'])
  remove(
    @Param('id') id: string,
    @DModel('Products') productModel: Model<Product>,
  ) {
    return this.productsService.remove(id, productModel);
  }
}
