// src/infrastructure/auth/controllers/auth.controller.ts
import { Controller, Post, Body, HttpCode  } from '@nestjs/common';
import { LoginUseCase } from 'src/application/auth/use-cases/login.use-case';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.loginUseCase.execute(email, password);
  }
}
