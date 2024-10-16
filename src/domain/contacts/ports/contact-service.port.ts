// src/domain/contacts/ports/contact-service.port.ts
import { Contact } from '../entities/contact.entity';

export interface ContactServicePort {
  createContact(contact: Contact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  getContactById(id: string): Promise<Contact>;
  updateContact(id: string, updateData: Partial<Contact>): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
}
