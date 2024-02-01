import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldMappingDto } from './create-field-mapping.dto';

export class UpdateFieldMappingDto extends PartialType(CreateFieldMappingDto) {}
