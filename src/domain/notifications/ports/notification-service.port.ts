// src/domain/notifications/ports/notification-service.port.ts
import { Notification } from '../entities/notification.entity';

export interface NotificationServicePort {
  create(notification: Notification): Promise<Notification>;
  findById(id: string): Promise<Notification | null>;
  update(id: string, notification: Notification): Promise<Notification>;
  delete(id: string): Promise<void>;
  findAll(queryParams: any): Promise<any>;
  sendEmail(to: string, subject: string, text: string): Promise<void>; 
}
