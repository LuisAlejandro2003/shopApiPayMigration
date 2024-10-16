// src/infrastructure/users/controllers/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/users/use-cases/create-user.use-case';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('register')
  async register(@Body() body: { password: string; contactId: string; phoneNumber: string }) {
    return this.createUserUseCase.execute(body.password, body.contactId, body.phoneNumber);
  }
}
