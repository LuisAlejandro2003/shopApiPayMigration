// src/infrastructure/notifications/notification.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './controllers/notification.controller';
import { CreateNotificationUseCase } from '../../application/notifications/use-cases/create-notification.use-case';
import { DeleteNotificationUseCase } from '../../application/notifications/use-cases/delete-notification.use-case';
import { GetNotificationByIdUseCase } from '../../application/notifications/use-cases/get-notification-by-id.use-case';
import { UpdateNotificationUseCase } from '../../application/notifications/use-cases/update-notification.use-case';
import { GetAllNotificationsUseCase } from '../../application/notifications/use-cases/get-all-notifications.use-case';
import { MongoDBNotificationAdapter } from './adapters/mongodb-notification.adapter';
import { NotificationSchema } from './adapters/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
  ],
  controllers: [NotificationController],
  providers: [
    CreateNotificationUseCase,
    DeleteNotificationUseCase,
    GetNotificationByIdUseCase,
    UpdateNotificationUseCase,
    GetAllNotificationsUseCase,  // Asegúrate de que GetAllNotificationsUseCase esté en providers
    {
      provide: 'NotificationServicePort',
      useClass: MongoDBNotificationAdapter,
    },
  ],
  exports: ['NotificationServicePort', GetAllNotificationsUseCase], // Asegúrate de exportar el caso de uso
})
export class NotificationModule {}
