import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Injectable()
export class MongoDBContactAdapter {
  constructor(@InjectModel(Contact.name) private readonly contactModel: Model<Contact>) {}

  async createContact(contact: Contact): Promise<Contact> {
    const newContact = new this.contactModel(contact);
    return await newContact.save();
  }

  async getContactById(contactId: string): Promise<Contact | null> {
    return await this.contactModel.findById(contactId).exec();
  }
  
}
