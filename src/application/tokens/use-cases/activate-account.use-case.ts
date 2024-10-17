// src/application/tokens/use-cases/activate-account.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';
import { ContactServicePort } from 'src/domain/contacts/ports/contact-service.port';

@Injectable()
export class ActivateAccountUseCase {
  constructor(
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
    @Inject('UserServicePort') private readonly userService: UserServicePort,
    @Inject('NotificationServicePort') private readonly notificationService: NotificationServicePort,
    @Inject('ContactServicePort') private readonly contactService: ContactServicePort,
  ) {}

  async execute(userId: string, token: string): Promise<void> {
    const isValidToken = await this.tokenService.validateToken(userId, token);
    if (!isValidToken) {
      throw new NotFoundException('Invalid token');
    }

    // Activa la cuenta del usuario
    await this.userService.activateUserAccount(userId);

    // Recupera el usuario sin populate
    const user = await this.userService.findUserById(userId);

    // Recupera el contacto utilizando el contactId del usuario
    const contact = await this.contactService.getContactById(user.contactId);

    // Envía un correo electrónico de activación
    if (contact && contact.email) {
      await this.notificationService.sendEmail(
        contact.email,
        'Account Activated',
        'Your account has been successfully activated.'
      );
    }
  }
}
