// src/infrastructure/products/adapters/product.schema.ts
import { Schema, Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  brand: string;
  category: string;
  price: number;
  description?: string;
}

export const ProductSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});
