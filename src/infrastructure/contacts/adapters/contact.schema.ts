// src/infrastructure/contacts/adapters/contact.schema.ts
import { Schema } from 'mongoose';

export const ContactSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userId: { type: String, default: null },
});
