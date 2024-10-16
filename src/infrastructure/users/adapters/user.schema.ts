// src/infrastructure/users/adapters/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDocument extends Document {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  contactId: string;

  @Prop()
  verifiedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
