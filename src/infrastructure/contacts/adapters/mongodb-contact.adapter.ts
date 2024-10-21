import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/domain/contacts/entities/contact.entity';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';

@Injectable()
export class MongoDBContactAdapter implements ContactServicePort {
  constructor(@InjectModel(Contact.name) private readonly contactModel: Model<Contact>) {}

  async createContact(contact: Contact): Promise<Contact> {
    const newContact = new this.contactModel(contact);
    return await newContact.save();
  }

  async getContactById(contactId: string): Promise<Contact | null> {
    return await this.contactModel.findById(contactId).exec();
  }

  // Asegúrate de tener este método bien implementado:
  async getAllContacts(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }

  async updateContact(id: string, updateData: Partial<Contact>): Promise<Contact | null> {
    return await this.contactModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteContact(id: string): Promise<void> {
    await this.contactModel.findByIdAndDelete(id).exec();
  }
}
