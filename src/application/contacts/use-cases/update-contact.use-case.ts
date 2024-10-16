// src/application/contacts/use-cases/update-contact.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Injectable()
export class UpdateContactUseCase {
  constructor(
    @Inject('ContactServicePort') private readonly contactService: ContactServicePort,
  ) {}

  async execute(id: string, updateData: Partial<Contact>): Promise<Contact> {
    return this.contactService.updateContact(id, updateData);
  }
}
