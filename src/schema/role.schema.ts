import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
    @Prop({ required: true, unique: true, type: String })
    name: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    roles: Record<string, string[]>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
