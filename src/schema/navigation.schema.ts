// export class NavigationSchema {}
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NavigationDocument = HydratedDocument<Navigation>;

@Schema()
export class Navigation {}

export const NavigationSchema = SchemaFactory.createForClass(Navigation);
