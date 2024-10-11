// src/application/notifications/use-cases/delete-notification.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(
    @Inject('NotificationServicePort')
    private readonly notificationService: NotificationServicePort,
  ) {}

  async execute(id: string): Promise<void> {
    await this.notificationService.delete(id);
  }
}
