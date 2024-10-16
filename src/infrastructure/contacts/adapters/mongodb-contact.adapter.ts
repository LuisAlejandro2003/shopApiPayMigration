// src/infrastructure/contacts/adapters/mongodb-contact.adapter.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Injectable()
export class MongoDBContactAdapter implements ContactServicePort {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<any>,
  ) {}

  async createContact(contact: Contact): Promise<Contact> {
    try {
      const newContact = new this.contactModel(contact);
      const savedContact = await newContact.save();

      return new Contact(
        savedContact._id.toString(),
        savedContact.email,
        savedContact.firstName,
        savedContact.lastName,
        savedContact.phoneNumber,
        savedContact.userId,
      );
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create contact: ${error.message}`);
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    const contacts = await this.contactModel.find().exec();
    return contacts.map((contact) =>
      new Contact(
        contact._id.toString(),
        contact.email,
        contact.firstName,
        contact.lastName,
        contact.phoneNumber,
        contact.userId,
      ),
    );
  }

  async getContactById(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) throw new NotFoundException('Contact not found');

    return new Contact(
      contact._id.toString(),
      contact.email,
      contact.firstName,
      contact.lastName,
      contact.phoneNumber,
      contact.userId,
    );
  }

  async updateContact(id: string, updateData: Partial<Contact>): Promise<Contact> {
    const updatedContact = await this.contactModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedContact) throw new NotFoundException('Contact not found');

    return new Contact(
      updatedContact._id.toString(),
      updatedContact.email,
      updatedContact.firstName,
      updatedContact.lastName,
      updatedContact.phoneNumber,
      updatedContact.userId,
    );
  }

  async deleteContact(id: string): Promise<void> {
    const result = await this.contactModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Contact not found');
  }
}
