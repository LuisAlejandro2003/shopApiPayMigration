// src/infrastructure/tokens/token.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from './controllers/token.controller';
import { GenerateTokenUseCase } from '../../application/tokens/use-cases/generate-token.use-case';
import { ActivateAccountUseCase } from '../../application/tokens/use-cases/activate-account.use-case';
import { ValidateTokenUseCase } from '../../application/tokens/use-cases/validate-token.use-case';
import { MongoDBTokenAdapter } from './adapters/mongodb-token.adapter';
import { TokenSchema } from './adapters/token.schema';
import { NotificationModule } from '../notifications/notification.module';
import { UserModule } from '../users/user.module';
import { ContactModule } from '../contacts/contact.module'; // Importar ContactModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    NotificationModule,
    forwardRef(() => UserModule), // forwardRef si hay dependencia circular
    forwardRef(() => ContactModule), // Añadir ContactModule
  ],
  controllers: [TokenController],
  providers: [
    GenerateTokenUseCase,
    ActivateAccountUseCase,
    ValidateTokenUseCase,
    {
      provide: 'TokenServicePort',
      useClass: MongoDBTokenAdapter,
    },
  ],
  exports: [ActivateAccountUseCase, GenerateTokenUseCase, ValidateTokenUseCase],
})
export class TokenModule {}
