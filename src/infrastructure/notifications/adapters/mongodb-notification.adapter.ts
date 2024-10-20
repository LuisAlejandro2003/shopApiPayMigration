// src/infrastructure/notifications/adapters/mongodb-notification.adapter.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';
import { Notification } from 'src/domain/notifications/entities/notification.entity';
import * as Twilio from 'twilio';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MongoDBNotificationAdapter implements NotificationServicePort {
  private client: Twilio.Twilio;
  private transporter;

  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<any>,
  ) {
    this.client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT,
      secure: false, // true para 465, falso para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async create(notification: Notification): Promise<Notification> {
    try {
      // Asegúrate de que el número de teléfono esté en formato E.164
      const phoneNumber = notification.phoneNumber.startsWith('+')
        ? notification.phoneNumber
        : `+${notification.phoneNumber}`;
  
      const response = await this.client.messages.create({
        body: notification.message,
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${phoneNumber}`,  // Aquí aseguras que siempre tendrá el formato correcto
      });
  
      const savedNotification = new this.notificationModel({
        ...notification,
        status: 'Sent',
        sid: response.sid,
        dateSent: response.dateCreated,
      });
  
      await savedNotification.save();
  
      return new Notification(
        savedNotification._id,
        savedNotification.phoneNumber,
        savedNotification.message,
        savedNotification.status,
        savedNotification.sid,
        savedNotification.dateSent,
      );
    } catch (error) {
      const failedNotification = new this.notificationModel({
        phoneNumber: notification.phoneNumber,
        message: notification.message,
        status: 'Failed',
        error: error.message,
      });
      await failedNotification.save();
      throw new InternalServerErrorException(`WhatsApp notification failed: ${error.message}`);
    }
  }
  

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Email notification failed: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) throw new NotFoundException('Notification not found');
    return new Notification(
      notification._id,
      notification.phoneNumber,
      notification.message,
      notification.status,
      notification.sid,
      notification.dateSent,
    );
  }

  async update(id: string, notification: Notification): Promise<Notification> {
    const updatedNotification = await this.notificationModel.findByIdAndUpdate(
      id,
      notification,
      { new: true },
    ).exec();

    if (!updatedNotification) throw new NotFoundException('Notification not found');
    return new Notification(
      updatedNotification._id,
      updatedNotification.phoneNumber,
      updatedNotification.message,
      updatedNotification.status,
      updatedNotification.sid,
      updatedNotification.dateSent,
    );
  }

  async delete(id: string): Promise<void> {
    const result = await this.notificationModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Notification not found');
  }

  async findAll(queryParams: any): Promise<any> {
    const { page = 1, limit = 10, ...filters } = queryParams;
    const skip = (page - 1) * limit;

    const [notifications, totalItems] = await Promise.all([
      this.notificationModel.find(filters).skip(skip).limit(Number(limit)).exec(),
      this.notificationModel.countDocuments(filters).exec(),
    ]);

    return {
      data: notifications,
      meta: {
        totalItems,
        itemCount: notifications.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }
}
