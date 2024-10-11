// src/infrastructure/notifications/controllers/notification.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateNotificationUseCase } from 'src/application/notifications/use-cases/create-notification.use-case';
import { GetAllNotificationsUseCase } from 'src/application/notifications/use-cases/get-all-notifications.use-case';
import { GetNotificationByIdUseCase } from 'src/application/notifications/use-cases/get-notification-by-id.use-case';
import { UpdateNotificationUseCase } from 'src/application/notifications/use-cases/update-notification.use-case';
import { DeleteNotificationUseCase } from 'src/application/notifications/use-cases/delete-notification.use-case';
import { Notification } from 'src/domain/notifications/entities/notification.entity';

@Controller('api/v1/notifications')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly getAllNotificationsUseCase: GetAllNotificationsUseCase,
    private readonly getNotificationByIdUseCase: GetNotificationByIdUseCase,
    private readonly updateNotificationUseCase: UpdateNotificationUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() notificationData: Notification) {
    const notification = await this.createNotificationUseCase.execute(notificationData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Notification created successfully',
      data: notification,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllNotifications(@Query() queryParams: any) {
    return await this.getAllNotificationsUseCase.execute(queryParams);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.getNotificationByIdUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() notificationData: Partial<Notification>) {
    return await this.updateNotificationUseCase.execute(id, notificationData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteNotificationUseCase.execute(id);
  }
}
