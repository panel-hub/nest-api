import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
