// src/infrastructure/users/user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../../application/users/use-cases/create-user.use-case';
import { MongoDBUserAdapter } from './adapters/mongodb-user.adapter';
import { UserSchema } from './adapters/user.schema';
import { TokenModule } from '../tokens/token.module'; // Importar TokenModule si es necesario

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => TokenModule), // Usar forwardRef si hay dependencia circular
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserServicePort',
      useClass: MongoDBUserAdapter,
    },
  ],
  exports: ['UserServicePort'], // Exportar UserServicePort
})
export class UserModule {}
