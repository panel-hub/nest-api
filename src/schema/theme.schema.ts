// export class ThemeSchema {}
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ThemeDocument = HydratedDocument<Theme>;

@Schema()
export class Theme {}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
