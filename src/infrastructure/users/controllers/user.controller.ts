// src/infrastructure/users/controllers/user.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/users/use-cases/create-user.use-case';
import { GenerateTokenUseCase } from 'src/application/tokens/use-cases/generate-token.use-case';
import { ActivateAccountUseCase } from 'src/application/tokens/use-cases/activate-account.use-case';
import { FindUserByEmailUseCase } from 'src/application/users/use-cases/find-user-by-email.use-case';
import { User } from 'src/domain/users/entities/user.entity';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase // Inyectar aquí
  ) {}

  @Post('register')
  async register(@Body() userData: User) {
    const { email, password, contactId, phoneNumber } = userData;
    const user = await this.createUserUseCase.execute(email, password, contactId, phoneNumber);
    await this.generateTokenUseCase.execute(user.id, phoneNumber);

    return user;
  }

  @Post('find-by-email')
  async findByEmail(@Body('email') email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }

  @Post(':userId/activate')
  async activate(@Param('userId') userId: string, @Body('token') token: string) {
    await this.activateAccountUseCase.execute(userId, token);
  }
}
