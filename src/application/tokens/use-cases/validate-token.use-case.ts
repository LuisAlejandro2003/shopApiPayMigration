// src/application/tokens/use-cases/validate-token.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';
import { ActivateAccountUseCase } from './activate-account.use-case'; // Importar el caso de uso de activación de cuenta

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
    @Inject('UserServicePort') private readonly userService: UserServicePort,
    private readonly activateAccountUseCase: ActivateAccountUseCase, // Inyectar el caso de uso
  ) {}

  async execute(tokenValue: string): Promise<void> {
    const token = await this.tokenService.findByValue(tokenValue);
    if (!token || token.validAt < new Date()) {
      throw new Error('Token inválido o expirado');
    }

    // Activar la cuenta del usuario y enviar el correo de confirmación
    await this.activateAccountUseCase.execute(token.userId, tokenValue);

    // Invalidar el token después de usarlo
    await this.tokenService.invalidateToken(token.id);
  }
}
