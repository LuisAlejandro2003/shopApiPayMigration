// src/application/contacts/use-cases/get-contact-by-id.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Injectable()
export class GetContactByIdUseCase {
  constructor(
    @Inject('ContactServicePort') private readonly contactService: ContactServicePort,
  ) {}

  async execute(id: string): Promise<Contact> {
    return this.contactService.getContactById(id);
  }
}
