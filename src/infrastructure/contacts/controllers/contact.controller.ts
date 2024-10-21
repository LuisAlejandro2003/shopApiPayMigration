import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CreateContactUseCase } from 'src/application/contacts/use-cases/create-contact.use-case';
import { GetAllContactsUseCase } from 'src/application/contacts/use-cases/get-all-contacts.use-case';
import { GetContactByIdUseCase } from 'src/application/contacts/use-cases/get-contact-by-id.use-case';
import { UpdateContactUseCase } from 'src/application/contacts/use-cases/update-contact.use-case';
import { DeleteContactUseCase } from 'src/application/contacts/use-cases/delete-contact.use-case';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { Contact } from 'src/domain/contacts/entities/contact.entity';

@Controller('api/v1/contacts')
export class ContactController {
  constructor(
    private readonly createContactUseCase: CreateContactUseCase,
    private readonly getAllContactsUseCase: GetAllContactsUseCase,
    private readonly getContactByIdUseCase: GetContactByIdUseCase,
    private readonly updateContactUseCase: UpdateContactUseCase,
    private readonly deleteContactUseCase: DeleteContactUseCase,
  ) {}

  // Endpoint para crear contacto
  @Post()
  async create(@Body() contactData: CreateContactDto) {
    const contact = new Contact(
      '', // ID generado automáticamente
      contactData.email,
      contactData.firstName,
      contactData.lastName,
      contactData.phoneNumber,
      null, // userId nulo por defecto
    );
    return await this.createContactUseCase.execute(contact);
  }

  // Endpoint para obtener todos los contactos
  @Get()
  async getAll() {
    return await this.getAllContactsUseCase.execute();
  }

  // Endpoint para obtener contacto por ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.getContactByIdUseCase.execute(id);
  }

  // Endpoint para actualizar un contacto
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateContactDto>) {
    return await this.updateContactUseCase.execute(id, updateData);
  }

  // Endpoint para eliminar un contacto
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteContactUseCase.execute(id);
  }
}
