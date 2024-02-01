import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product.schema';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto, productModel: Model<Product>) {
    return await productModel.create(createProductDto)
  }

  async findAll(productModel: Model<Product>) {
    return  await productModel.find();
  }

  async findOne(id: string, productModel: Model<Product>) {
    return await productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto, productModel: Model<Product>) {
    return await productModel.findByIdAndUpdate(id, { $set: updateProductDto });
  }

  async remove(id: string, productModel: Model<Product>) {
    return await productModel.findByIdAndDelete(id);
  }
}
