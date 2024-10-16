// src/application/tokens/use-cases/generate-token.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
    @Inject('NotificationServicePort') private readonly notificationService: NotificationServicePort,
  ) {}

  async execute(userId: string, phoneNumber: string): Promise<void> {
    const token = await this.tokenService.generateToken(userId, phoneNumber);

    const message = `Tu token de verificación es: ${token}`;
    await this.notificationService.create({
      id: '',
      phoneNumber,
      message,
      status: 'Pending',
    });
  }
}
