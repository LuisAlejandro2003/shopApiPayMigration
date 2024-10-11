// src/application/notifications/use-cases/update-notification.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';
import { Notification } from 'src/domain/notifications/entities/notification.entity';

@Injectable()
export class UpdateNotificationUseCase {
  constructor(
    @Inject('NotificationServicePort')
    private readonly notificationService: NotificationServicePort,
  ) {}

  async execute(id: string, notificationData: Partial<Notification>): Promise<Notification> {
    return this.notificationService.update(id, notificationData as Notification);
  }
}
