import { Injectable, Inject } from '@nestjs/common';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';

@Injectable()
export class ActivateAccountUseCase {
  constructor(
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
    @Inject('UserServicePort') private readonly userService: UserServicePort,
  ) {}

  async execute(userId: string, token: string): Promise<void> {
    const isValid = await this.tokenService.validateToken(userId, token); // Asegúrate de que validateToken esté implementado
    if (isValid) {
      await this.userService.activateUserAccount(userId);
    } else {
      throw new Error('Invalid token');
    }
  }
}
