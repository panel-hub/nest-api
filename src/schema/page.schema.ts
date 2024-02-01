import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema()
export class Page {}

export const PageSchema = SchemaFactory.createForClass(Page);
