import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/domain/contacts/entities/contact.entity';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';
import { UUID } from 'src/domain/contacts/value-objects/uuid.value-object';

@Injectable()
export class MongoDBContactAdapter implements ContactServicePort {
  constructor(@InjectModel(Contact.name) private readonly contactModel: Model<Contact>) {}

  async createContact(contact: Contact): Promise<Contact> {
    const newContact = new this.contactModel({
      _id: contact.id.toString(),  // Convertimos el UUID a string
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      userId: contact.userId ? contact.userId.toString() : null  // Si hay userId, también convertirlo
    });
    return await newContact.save();
  }
  async getContactById(contactId: string): Promise<Contact | null> {
    return await this.contactModel.findById(contactId).exec();
  }

  async updateContact(id: string, updateData: Partial<Contact>): Promise<Contact | null> {
    return await this.contactModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteContact(id: string): Promise<void> {
    await this.contactModel.findByIdAndDelete(id).exec();
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }
}
