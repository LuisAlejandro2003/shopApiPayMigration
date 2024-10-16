// src/infrastructure/contacts/controllers/contact.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { CreateContactUseCase } from 'src/application/contacts/use-cases/create-contact.use-case';
import { DeleteContactUseCase } from 'src/application/contacts/use-cases/delete-contact.use-case';
import { GetContactByIdUseCase } from 'src/application/contacts/use-cases/get-contact-by-id.use-case';
import { UpdateContactUseCase } from 'src/application/contacts/use-cases/update-contact.use-case';
import { GetAllContactsUseCase } from 'src/application/contacts/use-cases/get-all-contacts.use-case';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Controller('/api/v1/contacts')
export class ContactController {
  constructor(
    private readonly createContactUseCase: CreateContactUseCase,
    private readonly getAllContactsUseCase: GetAllContactsUseCase,
    private readonly getContactByIdUseCase: GetContactByIdUseCase,
    private readonly updateContactUseCase: UpdateContactUseCase,
    private readonly deleteContactUseCase: DeleteContactUseCase,
  ) {}

  @Post()
  async create(@Body() contact: Contact): Promise<Contact> {
    return this.createContactUseCase.execute(contact);
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.getAllContactsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Contact> {
    return this.getContactByIdUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Contact>): Promise<Contact> {
    return this.updateContactUseCase.execute(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteContactUseCase.execute(id);
  }
}
