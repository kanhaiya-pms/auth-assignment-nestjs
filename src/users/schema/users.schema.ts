import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema({timestamps: true, versionKey: false})
export class Users {
  @Prop({ required: true})
  name: string;

  @Prop({required: true, unique: true})
  userName: string;

  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);