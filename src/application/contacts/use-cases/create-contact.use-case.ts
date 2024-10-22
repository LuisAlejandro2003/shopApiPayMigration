import { UUID } from 'src/domain/contacts/value-objects/uuid.value-object';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';
import { Contact } from 'src/domain/contacts/entities/contact.entity';
import { Injectable, Inject } from '@nestjs/common';
import { CreateContactDto } from 'src/infrastructure/contacts/dtos/create-contact.dto';

@Injectable()
export class CreateContactUseCase {
  constructor(
    @Inject('ContactServicePort') private readonly contactService: ContactServicePort,
  ) {}

  async execute(contactData: CreateContactDto): Promise<Contact> {
    const contact = new Contact(
      new UUID(), // Generamos un nuevo UUID
      contactData.email,
      contactData.firstName,
      contactData.lastName,
      contactData.phoneNumber,
      null, // userId nulo
    );
    return this.contactService.createContact(contact);
  }
}
