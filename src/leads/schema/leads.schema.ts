import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LeadsDocument = HydratedDocument<Leads>;

@Schema({ timestamps: true, versionKey: false })
export class Leads {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, lowercase: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Users' })
  createdBy: string;

  @Prop({ required: true })
  products: string[];
}

export const LeadsSchema = SchemaFactory.createForClass(Leads);
