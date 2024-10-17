// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/users/use-cases/create-user.use-case';
import { GenerateTokenUseCase } from 'src/application/tokens/use-cases/generate-token.use-case';
import { User } from 'src/domain/users/entities/user.entity';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly generateTokenUseCase: GenerateTokenUseCase, // Inyecta GenerateTokenUseCase
  ) {}

  @Post('register')
  async register(@Body() userData: User) {
    console.log(userData); // Verifica el contenido de userData
    const { email, password, contactId, phoneNumber } = userData;
    const user = await this.createUserUseCase.execute(email, password, contactId, phoneNumber);
    
    // Genera y envía el token por WhatsApp
    await this.generateTokenUseCase.execute(user.id, phoneNumber);

    return user;
  }
}