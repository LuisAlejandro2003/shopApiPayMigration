import { Controller, Post, Body } from '@nestjs/common';
import { CreateContactUseCase } from 'src/application/contacts/use-cases/create-contact.use-case';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Controller('api/v1/contacts')
export class ContactController {
  constructor(private readonly createContactUseCase: CreateContactUseCase) {}

  @Post()
  async create(@Body() contactData: Contact) {
    return await this.createContactUseCase.execute(contactData);
  }
}
