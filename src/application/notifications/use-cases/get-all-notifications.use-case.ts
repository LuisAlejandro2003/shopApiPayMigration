// src/application/notifications/use-cases/get-all-notifications.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';

@Injectable()
export class GetAllNotificationsUseCase {
  constructor(
    @Inject('NotificationServicePort')
    private readonly notificationService: NotificationServicePort,
  ) {}

  async execute(queryParams: any): Promise<any> {
    return this.notificationService.findAll(queryParams);
  }
}
