// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/users/use-cases/create-user.use-case';
import { User } from 'src/domain/users/entities/user.entity';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('register')
  async register(@Body() userData: User) {
    console.log(userData); // Verifica el contenido de userData
    const { email, password, contactId, phoneNumber } = userData;
    return await this.createUserUseCase.execute(email, password, contactId, phoneNumber);
  }
}
