// token.controller.ts
import { Controller, Post, Param, Body } from '@nestjs/common';
import { ValidateTokenUseCase } from 'src/application/tokens/use-cases/validate-token.use-case';

@Controller('api/v1/tokens')
export class TokenController {
  constructor(private readonly validateTokenUseCase: ValidateTokenUseCase) {}

  @Post(':userId/validate')
  async validateToken(@Param('userId') userId: string, @Body('token') token: string) {
    return await this.validateTokenUseCase.execute( token);
  }
}
