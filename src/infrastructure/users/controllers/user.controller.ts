import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/users/use-cases/create-user.use-case';
import { GenerateTokenUseCase } from 'src/application/tokens/use-cases/generate-token.use-case';
import { ActivateAccountUseCase } from 'src/application/tokens/use-cases/activate-account.use-case';
import { User } from 'src/domain/users/entities/user.entity';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase // Añadido aquí
  ) {}

  @Post('register')
  async register(@Body() userData: User) {
    console.log(userData);
    const { email, password, contactId, phoneNumber } = userData;
    const user = await this.createUserUseCase.execute(email, password, contactId, phoneNumber);
    
    await this.generateTokenUseCase.execute(user.id, phoneNumber);

    return user;
  }

  @Post(':userId/activate')
  async activate(@Param('userId') userId: string, @Body('token') token: string) {
    await this.activateAccountUseCase.execute(userId, token);
  }
}
