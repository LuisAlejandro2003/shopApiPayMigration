// src/infrastructure/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { MongoDBAuthAdapter } from './adapters/mongodb-auth.adapter';
import { LoginUseCase } from 'src/application/auth/use-cases/login.use-case';
import { UserModule } from '../users/user.module';  // Importa el UserModule

@Module({
  imports: [
    MongooseModule.forFeature([]),
    UserModule, // Importa el módulo de usuarios
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
