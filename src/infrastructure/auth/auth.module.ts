// src/infrastructure/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { LoginUseCase } from '../../application/auth/use-cases/login.use-case';
import { MongoDBAuthAdapter } from './adapters/mongodb-auth.adapter';
import { UserModule } from '../users/user.module';  // Importa UserModule

@Module({
  imports: [
    forwardRef(() => UserModule),  // Evitar la dependencia circular
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    {
      provide: 'AuthServicePort',
      useClass: MongoDBAuthAdapter,
    },
  ],
})
export class AuthModule {}
