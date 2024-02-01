import { Module } from '@nestjs/common';
import { FieldMappingModule } from './field-mapping/field-mapping.module';

@Module({
  imports: [FieldMappingModule]
})
export class ProductsModule {}
