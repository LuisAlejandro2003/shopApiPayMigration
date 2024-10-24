// token.controller.ts
import { Controller, Post, Param, Body } from '@nestjs/common';
import { ValidateTokenUseCase } from 'src/application/tokens/use-cases/validate-token.use-case';
import { ValidateTokenDto } from '../dtos/validate-token.dto';

@Controller('api/v1/tokens')
export class TokenController {
  constructor(private readonly validateTokenUseCase: ValidateTokenUseCase) {}

  @Post(':userId')
  async validateToken(@Param('userId') userId: string, @Body() validateTokenDto: ValidateTokenDto) {
    const { token } = validateTokenDto;
    return await this.validateTokenUseCase.execute(token);
  }
}
