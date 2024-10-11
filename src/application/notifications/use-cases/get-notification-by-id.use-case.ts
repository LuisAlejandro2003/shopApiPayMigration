// src/application/notifications/use-cases/get-notification-by-id.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';

@Injectable()
export class GetNotificationByIdUseCase {
  constructor(
    @Inject('NotificationServicePort')
    private readonly notificationService: NotificationServicePort,
  ) {}

  async execute(id: string): Promise<any> {
    return this.notificationService.findById(id);
  }
}
