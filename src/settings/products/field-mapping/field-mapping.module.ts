import { Module } from '@nestjs/common';
import { FieldMappingService } from './field-mapping.service';
import { FieldMappingController } from './field-mapping.controller';

@Module({
  controllers: [FieldMappingController],
  providers: [FieldMappingService],
})
export class FieldMappingModule {}
