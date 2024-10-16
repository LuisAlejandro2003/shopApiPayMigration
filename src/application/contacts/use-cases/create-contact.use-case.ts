// src/application/contacts/use-cases/create-contact.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Injectable()
export class CreateContactUseCase {
  constructor(
    @Inject('ContactServicePort') private readonly contactService: ContactServicePort,
  ) {}

  async execute(contact: Contact): Promise<Contact> {
    return this.contactService.createContact(contact);
  }
}
