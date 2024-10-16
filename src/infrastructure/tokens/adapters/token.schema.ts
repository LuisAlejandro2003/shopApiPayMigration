// src/infrastructure/tokens/adapters/token.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TokenDocument extends Document {
  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  validAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenDocument);
