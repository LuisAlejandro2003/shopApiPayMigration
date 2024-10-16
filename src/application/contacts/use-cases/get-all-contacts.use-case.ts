// src/application/contacts/use-cases/get-all-contacts.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Injectable()
export class GetAllContactsUseCase {
  constructor(
    @Inject('ContactServicePort') private readonly contactService: ContactServicePort,
  ) {}

  async execute(): Promise<Contact[]> {
    return this.contactService.getAllContacts();
  }
}
