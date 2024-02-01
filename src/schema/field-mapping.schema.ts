import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FieldMappingDocument = HydratedDocument<FieldMapping>;

@Schema()
export class FieldMapping {}

export const FieldMappingSchema = SchemaFactory.createForClass(FieldMapping);
