// src/infrastructure/contacts/contact.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './controllers/contact.controller';
import { CreateContactUseCase } from '../../application/contacts/use-cases/create-contact.use-case';
import { MongoDBContactAdapter } from './adapters/mongodb-contact.adapter';
import { ContactSchema } from './adapters/contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
  ],
  controllers: [ContactController],
  providers: [
    CreateContactUseCase,
    {
      provide: 'ContactServicePort',
      useClass: MongoDBContactAdapter,
    },
  ],
  exports: ['ContactServicePort'], // Exportar ContactServicePort
})
export class ContactModule {}
