// src/infrastructure/tokens/controllers/token.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ValidateTokenUseCase } from 'src/application/tokens/use-cases/validate-token.use-case';

@Controller('api/v1/tokens')
export class TokenController {
  constructor(private readonly validateTokenUseCase: ValidateTokenUseCase) {}

  @Post('validate')
  async validate(@Body('value') value: string) {
    await this.validateTokenUseCase.execute(value);
  }
}
