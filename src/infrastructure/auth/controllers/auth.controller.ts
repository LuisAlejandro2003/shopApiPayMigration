// src/infrastructure/auth/controllers/auth.controller.ts
import { Controller, Post, Body, HttpCode  } from '@nestjs/common';
import { LoginUseCase } from 'src/application/auth/use-cases/login.use-case';
import { LoginDto } from '../dtos/login.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.loginUseCase.execute(email, password);
  }
}
