// src/application/contacts/use-cases/delete-contact.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';

@Injectable()
export class DeleteContactUseCase {
  constructor(
    @Inject('ContactServicePort') private readonly contactService: ContactServicePort,
  ) {}

  async execute(id: string): Promise<void> {
    return this.contactService.deleteContact(id);
  }
}
