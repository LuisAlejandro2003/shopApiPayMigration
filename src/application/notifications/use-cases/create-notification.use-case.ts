// src/application/notifications/use-cases/create-notification.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';
import { Notification } from 'src/domain/notifications/entities/notification.entity';

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    @Inject('NotificationServicePort')
    private readonly notificationService: NotificationServicePort,
  ) {}

  async execute(notification: Notification): Promise<Notification> {
    return this.notificationService.create(notification);
  }
}
