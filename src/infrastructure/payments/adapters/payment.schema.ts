import { Schema, Document } from 'mongoose';

export interface PaymentDocument extends Document {
  title: string;
  price: number;
  status: string;
  externalReference: string;
  successUrl: string;      // <-- Añadir esta propiedad
  failureUrl: string;  
  productId: string;     
}

export const PaymentSchema = new Schema<PaymentDocument>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  externalReference: { type: String, required: true },
  successUrl: { type: String, required: true },  // <-- Añadir definición de campo
  failureUrl: { type: String, required: true },   // <-- Añadir definición de campo
  productId: { type: String, required: true },
});
