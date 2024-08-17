import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema({timestamps: true, versionKey: false})
export class Users {
  @Prop({ required: true})
  name: string;

  @Prop({required: true, unique: true, lowercase: true})
  userName: string;

  @Prop({required: true, unique: true, lowercase: true})
  email: string;

  @Prop({default: ""})
  otp: number;

  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);