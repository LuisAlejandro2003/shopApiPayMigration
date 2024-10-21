import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './adapters/contact.schema';
import { ContactController } from './controllers/contact.controller';
import { MongoDBContactAdapter } from './adapters/mongodb-contact.adapter';
import { CreateContactUseCase } from 'src/application/contacts/use-cases/create-contact.use-case';
import { GetAllContactsUseCase } from 'src/application/contacts/use-cases/get-all-contacts.use-case';
import { GetContactByIdUseCase } from 'src/application/contacts/use-cases/get-contact-by-id.use-case';
import { UpdateContactUseCase } from 'src/application/contacts/use-cases/update-contact.use-case';
import { DeleteContactUseCase } from 'src/application/contacts/use-cases/delete-contact.use-case';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }])],
  controllers: [ContactController],
  providers: [
    MongoDBContactAdapter,
    {
      provide: 'ContactServicePort',
      useClass: MongoDBContactAdapter,
    },
    CreateContactUseCase,
    GetAllContactsUseCase,
    GetContactByIdUseCase,
    UpdateContactUseCase,
    DeleteContactUseCase,
  ],
  exports: ['ContactServicePort'],
})
export class ContactModule {}
