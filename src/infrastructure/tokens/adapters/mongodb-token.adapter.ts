// src/infrastructure/tokens/adapters/mongodb-token.adapter.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';
import { NotificationServicePort } from 'src/domain/notifications/ports/notification-service.port';
import { Token } from 'src/domain/tokens/entities/token.entity';

@Injectable()
export class MongoDBTokenAdapter implements TokenServicePort {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<any>,
    @Inject('NotificationServicePort') private readonly notificationService: NotificationServicePort,
  ) {}

  async generateToken(userId: string, phoneNumber: string): Promise<void> {
    const generatedValue = Math.random().toString(36).substring(2, 10);

    const tokenData = new this.tokenModel({
      userId,
      value: generatedValue,
      type: 'verification',
      createdAt: new Date(),
      validAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await tokenData.save();

    // Enviar token vía WhatsApp
    const message = `Tu token de verificación es: ${generatedValue}`;
    await this.notificationService.create({
      id: '', // Será generado por MongoDB
      phoneNumber,
      message,
      status: 'Pending',
    });
  }

  async findByValue(value: string): Promise<Token | null> {
    const token = await this.tokenModel.findOne({ value }).exec();
    if (!token) return null;

    return new Token(
      token._id.toString(),
      token.value,
      token.type,
      token.userId,
      token.createdAt,
      token.validAt,
    );
  }

  async invalidateToken(id: string): Promise<void> {
    await this.tokenModel.findByIdAndDelete(id).exec();
  }
}
