// src/infrastructure/users/user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './adapters/user.schema';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../../application/users/use-cases/create-user.use-case';
import { MongoDBUserAdapter } from './adapters/mongodb-user.adapter';
import { TokenModule } from '../tokens/token.module'; // Importa el TokenModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => TokenModule), // Importar TokenModule para usar GenerateTokenUseCase
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserServicePort',
      useClass: MongoDBUserAdapter,
    },
  ],
  exports: [
    MongooseModule,
    'UserServicePort',
  ],
})
export class UserModule {}
