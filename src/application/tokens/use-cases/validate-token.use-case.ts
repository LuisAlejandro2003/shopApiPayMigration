// src/application/tokens/use-cases/validate-token.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
    @Inject('UserServicePort') private readonly userService: UserServicePort,
  ) {}

  async execute(tokenValue: string): Promise<void> {
    const token = await this.tokenService.findByValue(tokenValue);
    if (!token || token.validAt < new Date()) {
      throw new Error('Token inválido o expirado');
    }
    await this.userService.activateUser(token.userId);
    await this.tokenService.invalidateToken(token.id);
  }
}
